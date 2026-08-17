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
    renderer.setClearColor(0x000d1a, 1);
    el.appendChild(renderer.domElement);

    // --- Scene + Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 3, 7);
    camera.lookAt(0, 0, 0);
    scene.fog = new THREE.FogExp2(0x001428, 0.018);

    // --- Sky / background gradient plane ---
    const skyMat = new THREE.ShaderMaterial({
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uScrollProgress: { value: 0 },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }
      `,
      fragmentShader: `
        uniform float uScrollProgress;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          // horizon level shifts down as we go underwater
          float horizon = mix(0.52, 0.0, uScrollProgress);

          vec3 skyHigh   = vec3(0.38, 0.65, 0.95);
          vec3 skyLow    = vec3(0.60, 0.82, 0.97);
          vec3 seaSurf   = vec3(0.06, 0.24, 0.50);
          vec3 deepSea   = vec3(0.01, 0.07, 0.22);
          vec3 abyss     = vec3(0.0,  0.02, 0.10);

          vec3 col;
          if (vUv.y > horizon) {
            float t = (vUv.y - horizon) / (1.0 - horizon);
            col = mix(skyLow, skyHigh, t);
            // subtle cloud wisps
            float cloud = sin(vUv.x * 8.0 + uTime * 0.05) * 0.5 + 0.5;
            col += cloud * 0.04 * vec3(1.);
          } else {
            float t = vUv.y / max(horizon, 0.001);
            col = mix(abyss, mix(deepSea, seaSurf, uScrollProgress < 0.5 ? 1.0 : 0.0), t);
          }

          // Sun at horizon
          float dx = vUv.x - 0.5;
          float dy = vUv.y - horizon;
          float sun = exp(-dx*dx*18.0 - dy*dy*22.0);
          col += sun * 0.55 * vec3(1.0, 0.88, 0.55) * (1.0 - uScrollProgress);

          // Underwater tint overlay
          col = mix(col, vec3(0.0, 0.10, 0.28), uScrollProgress * 0.75);

          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const skyGeo = new THREE.PlaneGeometry(300, 200);
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.position.set(0, 10, -50);
    sky.rotation.x = -0.1;
    scene.add(sky);

    // --- Animated water surface ---
    const waterMat = new THREE.ShaderMaterial({
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
          float e = 0.;
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

          float t = clamp(vElev * 1.4 + 0.5, 0., 1.);
          vec3 col = mix(deep, shallow, t);
          float f = smoothstep(0.2, 0.42, vElev);
          col = mix(col, foam, f * 0.45);
          float spec = pow(max(0., vElev), 2.5) * 0.25;
          col += spec;
          col = mix(col, under, uScrollProgress * 0.7);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    });
    const waterGeo = new THREE.PlaneGeometry(120, 120, 128, 128);
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.5;
    scene.add(water);

    // --- Underwater light rays (large transparent planes) ---
    const rayCount = 6;
    const rays: THREE.Mesh[] = [];
    for (let i = 0; i < rayCount; i++) {
      const rGeo = new THREE.PlaneGeometry(1.5 + Math.random(), 20);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      const ray = new THREE.Mesh(rGeo, rMat);
      ray.position.set(
        (Math.random() - 0.5) * 20,
        -5 - Math.random() * 8,
        (Math.random() - 0.5) * 15
      );
      ray.rotation.z = (Math.random() - 0.5) * 0.5;
      scene.add(ray);
      rays.push(ray);
    }

    // --- Bubble particles ---
    const BUBBLES = 400;
    const bGeo = new THREE.BufferGeometry();
    const bPos = new Float32Array(BUBBLES * 3);
    const bSpd = new Float32Array(BUBBLES);
    for (let i = 0; i < BUBBLES; i++) {
      bPos[i * 3]     = (Math.random() - 0.5) * 50;
      bPos[i * 3 + 1] = -(Math.random() * 20 + 2);
      bPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      bSpd[i]         = 0.004 + Math.random() * 0.008;
    }
    bGeo.setAttribute("position", new THREE.BufferAttribute(bPos, 3));
    const bMat = new THREE.PointsMaterial({
      color: 0x55ddff,
      size: 0.06,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const bubbles = new THREE.Points(bGeo, bMat);
    scene.add(bubbles);

    // --- Lights ---
    scene.add(new THREE.AmbientLight(0x002244, 2));
    const sun = new THREE.DirectionalLight(0xffeebb, 1.5);
    sun.position.set(3, 10, -5);
    scene.add(sun);

    // --- Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // --- Scroll target element: find .ocean-scroll-container or use window ---
    const getScrollProgress = () => {
      const scrollEl = document.querySelector(".ocean-scroll-container") as HTMLElement | null;
      const scrollTop = scrollEl ? scrollEl.scrollTop : window.scrollY;
      const totalH = scrollEl ? scrollEl.scrollHeight - scrollEl.clientHeight : document.body.scrollHeight - window.innerHeight;
      const vh = window.innerHeight;
      // Progress: 0 at surface, 1 after 1.5 viewports of scroll
      return Math.min(scrollTop / (vh * 1.5), 1);
    };

    // --- Clock + Animation ---
    const clock = new THREE.Clock();
    let animId: number;
    const animate = () => {
      const t = clock.getElapsedTime();
      const sp = getScrollProgress();

      (skyMat.uniforms.uTime as THREE.IUniform).value = t;
      (skyMat.uniforms.uScrollProgress as THREE.IUniform).value = sp;
      (waterMat.uniforms.uTime as THREE.IUniform).value = t;
      (waterMat.uniforms.uScrollProgress as THREE.IUniform).value = sp;

      // Camera dives below surface
      camera.position.y = 3 - sp * 11;
      camera.position.z = 7 - sp * 3;
      camera.lookAt(0, camera.position.y - 2.5, 0);

      // Bubbles rise + appear underwater
      bMat.opacity = Math.min(sp * 1.8, 0.75);
      const posAttr = bGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < BUBBLES; i++) {
        posAttr.array[i * 3 + 1] += bSpd[i];
        if (posAttr.array[i * 3 + 1] > 0) {
          posAttr.array[i * 3 + 1] = -20 - Math.random() * 5;
        }
      }
      posAttr.needsUpdate = true;

      // Light rays fade in underwater
      rays.forEach((ray, i) => {
        (ray.material as THREE.MeshBasicMaterial).opacity =
          sp * (0.04 + Math.sin(t * 0.5 + i) * 0.02);
        ray.rotation.y += 0.001;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
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
