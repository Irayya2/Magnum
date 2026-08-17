"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OceanBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x7ec0ff, 1); // Sky blue on load
    el.appendChild(renderer.domElement);

    // --- Scene + Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 3.5, 8.5);
    camera.lookAt(0, 0.2, 0);

    // Exp2 Fog is used for realistic volumetric scattering
    scene.fog = new THREE.FogExp2(0xaad4ff, 0.005);

    // --- Sky Plane (Gradient + Cloud shader that fades on dive) ---
    const skyMat = new THREE.ShaderMaterial({
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uScrollProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform float uScrollProgress;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vec3 skyHigh = vec3(0.38, 0.65, 0.95);
          vec3 skyLow  = vec3(0.70, 0.88, 1.00);

          vec3 col = mix(skyLow, skyHigh, vUv.y);

          // Subtle moving clouds
          float cloud = sin(vUv.x * 6.0 + uTime * 0.04) * cos(vUv.y * 4.0) * 0.5 + 0.5;
          col += cloud * 0.05 * vec3(1.0);

          // Sky plane fades out completely between 25% and 40% scroll depth
          float alpha = clamp(1.0 - (uScrollProgress - 0.25) / 0.15, 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });
    const skyGeo = new THREE.PlaneGeometry(300, 200);
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.position.set(0, 10, -50);
    sky.rotation.x = -0.1;
    scene.add(sky);

    // --- Animated 3D Water Surface (Double-Sided for Underwater View) ---
    const waterMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide, // Critical: keeps plane visible from below
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElev;

        float wave(vec2 p, float freq, float speed, float amp) {
          return sin(p.x*freq + uTime*speed)*cos(p.y*freq*.7 + uTime*speed*.9)*amp;
        }

        void main() {
          vUv = uv;
          vec3 p = position;
          float e = 0.0;
          e += wave(p.xy, 0.35, 1.1, 0.40);
          e += wave(p.xy, 0.75, 0.8, 0.20);
          e += wave(p.yx, 0.55, 1.4, 0.14);
          e += wave(p.xy, 1.50, 1.7, 0.08);
          p.z += e;
          vElev = e;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uScrollProgress;
        varying float vElev;
        varying vec2 vUv;

        void main() {
          vec3 shallow = vec3(0.05, 0.32, 0.55);
          vec3 deep    = vec3(0.01, 0.07, 0.20);
          vec3 foam    = vec3(0.75, 0.92, 1.00);
          vec3 under   = vec3(0.00, 0.10, 0.28);

          float t = clamp(vElev * 1.4 + 0.5, 0.0, 1.0);
          vec3 col = mix(deep, shallow, t);
          float f = smoothstep(0.2, 0.42, vElev);
          col = mix(col, foam, f * 0.45);
          float spec = pow(max(0.0, vElev), 2.5) * 0.25;
          col += spec;
          
          // Make bottom side semi-translucent when camera goes below surface (sp > 0.35)
          float isUnderwater = step(0.35, uScrollProgress);
          vec3 finalCol = mix(col, under, isUnderwater * 0.6);
          float alpha = mix(1.0, 0.55, isUnderwater);

          gl_FragColor = vec4(finalCol, alpha);
        }
      `,
    });
    const waterGeo = new THREE.PlaneGeometry(120, 120, 128, 128);
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.5;
    scene.add(water);

    // --- Underwater Light Rays ---
    const rayCount = 6;
    const rays: THREE.Mesh[] = [];
    for (let i = 0; i < rayCount; i++) {
      const rGeo = new THREE.PlaneGeometry(1.5 + Math.random() * 1.5, 25);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0x3ac5ff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ray = new THREE.Mesh(rGeo, rMat);
      // Place deep underwater
      ray.position.set(
        (Math.random() - 0.5) * 20,
        -6 - Math.random() * 8,
        (Math.random() - 0.5) * 15
      );
      ray.rotation.z = (Math.random() - 0.5) * 0.4;
      scene.add(ray);
      rays.push(ray);
    }

    // --- Bubble Particles ---
    const BUBBLES = 300;
    const bGeo = new THREE.BufferGeometry();
    const bPos = new Float32Array(BUBBLES * 3);
    const bSpd = new Float32Array(BUBBLES);
    for (let i = 0; i < BUBBLES; i++) {
      bPos[i * 3]     = (Math.random() - 0.5) * 40;
      bPos[i * 3 + 1] = -(Math.random() * 15 + 2); // Start underwater
      bPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
      bSpd[i]         = 0.005 + Math.random() * 0.01;
    }
    bGeo.setAttribute("position", new THREE.BufferAttribute(bPos, 3));
    const bMat = new THREE.PointsMaterial({
      color: 0x8be5ff,
      size: 0.06,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const bubblePoints = new THREE.Points(bGeo, bMat);
    scene.add(bubblePoints);

    // --- Swimming Fish Meshes (3D Procedural clownfish/marine models) ---
    const createFishMesh = () => {
      const fishGroup = new THREE.Group();
      
      // Fish body: cone aligned horizontally
      const bodyGeo = new THREE.ConeGeometry(0.12, 0.5, 5);
      bodyGeo.rotateZ(Math.PI / 2);
      
      // Random species color (clownfish orange, tang yellow, surgeon blue, chrome white)
      const colors = [0xff6a13, 0xf5b041, 0x3498db, 0xecf0f1];
      const randColor = colors[Math.floor(Math.random() * colors.length)];
      
      const bodyMat = new THREE.MeshBasicMaterial({ color: randColor });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      fishGroup.add(body);
      
      // Tail fin
      const tailGeo = new THREE.ConeGeometry(0.08, 0.2, 4);
      tailGeo.rotateZ(-Math.PI / 2);
      const tailMat = new THREE.MeshBasicMaterial({ color: randColor });
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tail.position.x = -0.3;
      fishGroup.add(tail);
      
      return fishGroup;
    };

    const fishCount = 18;
    const fishList: THREE.Group[] = [];
    const fishSpeeds: number[] = [];
    const fishWiggleSpeeds: number[] = [];

    for (let i = 0; i < fishCount; i++) {
      const fish = createFishMesh();
      
      // Position fish at varying depths
      const x = (Math.random() - 0.5) * 25;
      const y = -2.0 - Math.random() * 8.0;
      const z = (Math.random() - 0.5) * 12;
      fish.position.set(x, y, z);
      
      // Scale fish randomly (small to medium)
      const scale = 0.5 + Math.random() * 0.8;
      fish.scale.set(scale, scale, scale);
      
      // Speed & direction
      const direction = Math.random() > 0.5 ? 1 : -1;
      const speed = (0.008 + Math.random() * 0.018) * direction;
      
      fishSpeeds.push(speed);
      fishWiggleSpeeds.push(10 + Math.random() * 10);

      // Rotate to point in swimming direction
      if (direction < 0) {
        fish.rotation.y = Math.PI;
      }

      scene.add(fish);
      fishList.push(fish);
    }

    // --- Large Background Shark Silhouette ---
    const sharkGroup = new THREE.Group();
    const sharkBodyGeo = new THREE.ConeGeometry(0.45, 2.5, 6);
    sharkBodyGeo.rotateZ(Math.PI / 2);
    // Dark silhouette color blends with deep fog
    const sharkMat = new THREE.MeshBasicMaterial({ 
      color: 0x021122, 
      transparent: true, 
      opacity: 0.65 
    });
    const sharkBody = new THREE.Mesh(sharkBodyGeo, sharkMat);
    sharkGroup.add(sharkBody);

    const sharkTailGeo = new THREE.ConeGeometry(0.25, 0.7, 4);
    sharkTailGeo.rotateZ(-Math.PI / 2);
    const sharkTail = new THREE.Mesh(sharkTailGeo, sharkMat);
    sharkTail.position.x = -1.5;
    sharkGroup.add(sharkTail);

    const sharkDorsalGeo = new THREE.ConeGeometry(0.16, 0.5, 4);
    sharkDorsalGeo.rotateX(Math.PI / 4);
    const sharkDorsal = new THREE.Mesh(sharkDorsalGeo, sharkMat);
    sharkDorsal.position.set(-0.2, 0.35, 0);
    sharkGroup.add(sharkDorsal);

    sharkGroup.position.set(-15, -6.5, -12);
    scene.add(sharkGroup);

    // --- Scroll target helper ---
    const getScrollProgress = () => {
      const scrollEl = document.querySelector(".ocean-scroll-container") as HTMLElement | null;
      const scrollTop = scrollEl ? scrollEl.scrollTop : window.scrollY;
      const vh = window.innerHeight;
      // Dive reaches bottom depth over first 1.2 viewports of scroll
      return Math.min(scrollTop / (vh * 1.2), 1);
    };

    // --- Animation loop ---
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const t = clock.getElapsedTime();
      const sp = getScrollProgress();

      // Update shader uniforms
      (skyMat.uniforms.uTime as THREE.IUniform).value = t;
      (skyMat.uniforms.uScrollProgress as THREE.IUniform).value = sp;
      (waterMat.uniforms.uTime as THREE.IUniform).value = t;
      (waterMat.uniforms.uScrollProgress as THREE.IUniform).value = sp;

      // 1. Dynamic Camera Descend Sequence
      let camY = 3.5;
      let camZ = 8.5;
      let lookY = 0.2;

      if (sp < 0.35) {
        // Phase A: Above water, approaching surface
        const p = sp / 0.35;
        camY = THREE.MathUtils.lerp(3.5, -0.2, p);
        camZ = THREE.MathUtils.lerp(8.5, 6.0, p);
        lookY = THREE.MathUtils.lerp(0.2, -0.4, p);
      } else if (sp < 0.50) {
        // Phase B: Crossing the surface (Splash Zone)
        const p = (sp - 0.35) / 0.15;
        camY = THREE.MathUtils.lerp(-0.2, -2.0, p);
        camZ = THREE.MathUtils.lerp(6.0, 5.0, p);
        lookY = THREE.MathUtils.lerp(-0.4, -3.5, p);
      } else {
        // Phase C: Deep diving underwater
        const p = (sp - 0.50) / 0.50;
        camY = THREE.MathUtils.lerp(-2.0, -11.0, p);
        camZ = THREE.MathUtils.lerp(5.0, 3.5, p);
        lookY = THREE.MathUtils.lerp(-3.5, -13.0, p);
      }

      // Add a subtle viewport breathing motion (floating on waves when above, water currents when below)
      const waveShift = Math.sin(t * 0.8) * 0.05;
      camera.position.set(0, camY + waveShift, camZ);
      camera.lookAt(0, lookY, 0);

      // 2. Dynamic Environment (Clear Color & Fog) transitions
      const clearColor = new THREE.Color();
      const fogColor = new THREE.Color();
      let fogDensity = 0.005;

      if (sp < 0.35) {
        // Above water: bright blue skies and mist
        const p = sp / 0.35;
        clearColor.lerpColors(new THREE.Color(0x7ec0ff), new THREE.Color(0x3da3ff), p);
        fogColor.lerpColors(new THREE.Color(0xaad4ff), new THREE.Color(0x3da3ff), p);
        fogDensity = THREE.MathUtils.lerp(0.005, 0.02, p);
      } else if (sp < 0.50) {
        // Crossing: plunge into intermediate teal-blue depth
        const p = (sp - 0.35) / 0.15;
        clearColor.lerpColors(new THREE.Color(0x3da3ff), new THREE.Color(0x002850), p);
        fogColor.lerpColors(new THREE.Color(0x3da3ff), new THREE.Color(0x002850), p);
        fogDensity = THREE.MathUtils.lerp(0.02, 0.08, p);
      } else {
        // Deep water: fade into dark indigo/navy abyss
        const p = (sp - 0.50) / 0.50;
        clearColor.lerpColors(new THREE.Color(0x002850), new THREE.Color(0x00060f), p);
        fogColor.lerpColors(new THREE.Color(0x002850), new THREE.Color(0x00060f), p);
        fogDensity = THREE.MathUtils.lerp(0.08, 0.15, p);
      }

      renderer.setClearColor(clearColor, 1);
      if (scene.fog) {
        scene.fog.color.copy(fogColor);
        (scene.fog as THREE.FogExp2).density = fogDensity;
      }

      // 3. Bubbles rising animation (fade in when underwater)
      bMat.opacity = Math.max(0, Math.min((sp - 0.25) * 2.5, 0.7));
      const posAttr = bGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < BUBBLES; i++) {
        posAttr.array[i * 3 + 1] += bSpd[i]; // Rise
        // Sway bubbles side to side slightly
        posAttr.array[i * 3] += Math.sin(t * 2 + i) * 0.002;
        if (posAttr.array[i * 3 + 1] > 0) {
          posAttr.array[i * 3 + 1] = -15 - Math.random() * 5; // Reset to deep
        }
      }
      posAttr.needsUpdate = true;

      // 4. Light rays fade in when underwater and flicker
      rays.forEach((ray, i) => {
        const rayAlpha = Math.max(0, Math.min((sp - 0.35) * 2.0, 1.0));
        (ray.material as THREE.MeshBasicMaterial).opacity =
          rayAlpha * (0.05 + Math.sin(t * 0.8 + i) * 0.02);
        ray.rotation.y += 0.0005;
      });

      // 5. Swim and animate fish models
      fishList.forEach((fish, i) => {
        // Move fish forward
        const speed = fishSpeeds[i];
        fish.position.x += speed;

        // Fish wiggles tail as it swims
        const tail = fish.children[1];
        tail.rotation.y = Math.sin(t * fishWiggleSpeeds[i] + i) * 0.35;

        // Sway fish up/down slightly on water current
        fish.position.y += Math.sin(t * 0.5 + i) * 0.001;

        // Wrap around margins
        if (speed > 0 && fish.position.x > 18) {
          fish.position.x = -18;
        } else if (speed < 0 && fish.position.x < -18) {
          fish.position.x = 18;
        }
      });

      // 6. Animate Background Shark Silhouette
      sharkGroup.position.x += 0.012;
      // Sway shark tail slowly
      const sharkTailMesh = sharkGroup.children[1];
      sharkTailMesh.rotation.y = Math.sin(t * 2) * 0.12;
      if (sharkGroup.position.x > 22) {
        sharkGroup.position.x = -22;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    // --- Responsive Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      skyGeo.dispose();
      skyMat.dispose();
      waterGeo.dispose();
      waterMat.dispose();
      bGeo.dispose();
      bMat.dispose();
      fishList.forEach(fish => {
        fish.children.forEach(c => {
          if (c instanceof THREE.Mesh) {
            c.geometry.dispose();
            c.material.dispose();
          }
        });
      });
      sharkGroup.children.forEach(c => {
        if (c instanceof THREE.Mesh) {
          c.geometry.dispose();
          c.material.dispose();
        }
      });
      rays.forEach(r => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
