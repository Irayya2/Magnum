"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function OceanBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const el = mountRef.current;

    // ============================================================
    // RENDERER
    // ============================================================

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setClearColor(0x7ec0ff, 1);

    el.appendChild(renderer.domElement);

    // ============================================================
    // SCENE + CAMERA
    // ============================================================

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );

    // Camera starts ABOVE the ocean.
    camera.position.set(0, 4.0, 9.0);

    camera.lookAt(0, 0, 0);

    // Underwater atmospheric fog.
    scene.fog = new THREE.FogExp2(
      0xaad4ff,
      0.005
    );

    // ============================================================
    // SKY
    // ============================================================

    const skyMat = new THREE.ShaderMaterial({
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,

      uniforms: {
        uScrollProgress: {
          value: 0,
        },

        uTime: {
          value: 0,
        },
      },

      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;

          gl_Position =
            projectionMatrix *
            modelViewMatrix *
            vec4(position, 1.0);
        }
      `,

      fragmentShader: `
        uniform float uScrollProgress;
        uniform float uTime;

        varying vec2 vUv;

        void main() {

          vec3 skyHigh =
            vec3(0.38, 0.65, 0.95);

          vec3 skyLow =
            vec3(0.70, 0.88, 1.00);

          vec3 col =
            mix(
              skyLow,
              skyHigh,
              vUv.y
            );

          // Very subtle moving cloud pattern.
          float cloud =
            sin(
              vUv.x * 6.0 +
              uTime * 0.04
            )
            *
            cos(
              vUv.y * 4.0
            )
            *
            0.5
            +
            0.5;

          col +=
            cloud *
            0.04 *
            vec3(1.0);

          // Sky gradually disappears ONLY
          // as the camera actually goes underwater.
          float alpha =
            1.0 -
            smoothstep(
              0.28,
              0.48,
              uScrollProgress
            );

          gl_FragColor =
            vec4(col, alpha);
        }
      `,
    });

    const skyGeo =
      new THREE.PlaneGeometry(
        300,
        200
      );

    const sky =
      new THREE.Mesh(
        skyGeo,
        skyMat
      );

    sky.position.set(
      0,
      12,
      -55
    );

    sky.rotation.x = -0.1;

    scene.add(sky);

    // ============================================================
    // OCEAN WATER SURFACE
    // ============================================================

    const waterMat =
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.DoubleSide,

        uniforms: {
          uTime: {
            value: 0,
          },

          uScrollProgress: {
            value: 0,
          },
        },

        vertexShader: `
          uniform float uTime;

          varying vec2 vUv;
          varying float vElev;

          float wave(
            vec2 p,
            float freq,
            float speed,
            float amp
          ) {

            return
              sin(
                p.x * freq +
                uTime * speed
              )
              *
              cos(
                p.y * freq * 0.7 +
                uTime * speed * 0.9
              )
              *
              amp;
          }

          void main() {

            vUv = uv;

            vec3 p = position;

            float e = 0.0;

            e += wave(
              p.xy,
              0.35,
              1.1,
              0.40
            );

            e += wave(
              p.xy,
              0.75,
              0.8,
              0.20
            );

            e += wave(
              p.yx,
              0.55,
              1.4,
              0.14
            );

            e += wave(
              p.xy,
              1.50,
              1.7,
              0.08
            );

            p.z += e;

            vElev = e;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(p, 1.0);
          }
        `,

        fragmentShader: `
          uniform float uScrollProgress;

          varying float vElev;
          varying vec2 vUv;

          void main() {

            vec3 shallow =
              vec3(
                0.05,
                0.32,
                0.55
              );

            vec3 deep =
              vec3(
                0.01,
                0.07,
                0.20
              );

            vec3 foam =
              vec3(
                0.75,
                0.92,
                1.00
              );

            float t =
              clamp(
                vElev * 1.4 +
                0.5,
                0.0,
                1.0
              );

            vec3 col =
              mix(
                deep,
                shallow,
                t
              );

            // Surface highlights.
            float f =
              smoothstep(
                0.20,
                0.42,
                vElev
              );

            col =
              mix(
                col,
                foam,
                f * 0.45
              );

            // Sun reflection.
            float spec =
              pow(
                max(
                  0.0,
                  vElev
                ),
                2.5
              ) *
              0.25;

            col += spec;

            // Keep the water surface itself visible.
            // Do NOT turn the entire plane into a dark
            // underwater rectangle.
            gl_FragColor =
              vec4(
                col,
                0.88
              );
          }
        `,
      });

    const waterGeo =
      new THREE.PlaneGeometry(
        160,
        160,
        160,
        160
      );

    const water =
      new THREE.Mesh(
        waterGeo,
        waterMat
      );

    // Horizontal ocean surface.
    water.rotation.x =
      -Math.PI / 2;

    // THIS IS THE ACTUAL WATER SURFACE.
    // Camera will physically cross y = 0.
    water.position.set(
      0,
      0,
      0
    );

    scene.add(water);

    // ============================================================
    // UNDERWATER LIGHT RAYS
    // ============================================================

    const rayCount = 8;

    const rays: THREE.Mesh[] = [];

    for (
      let i = 0;
      i < rayCount;
      i++
    ) {

      const rGeo =
        new THREE.PlaneGeometry(
          1.5 +
            Math.random() * 2.5,
          25
        );

      const rMat =
        new THREE.MeshBasicMaterial({
          color: 0x65d8ff,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

      const ray =
        new THREE.Mesh(
          rGeo,
          rMat
        );

      ray.position.set(
        (Math.random() - 0.5) * 25,
        -3 -
          Math.random() * 14,
        (Math.random() - 0.5) * 20
      );

      ray.rotation.z =
        (Math.random() - 0.5) *
        0.4;

      scene.add(ray);

      rays.push(ray);
    }

    // ============================================================
    // BUBBLE PARTICLES
    // ============================================================

    const BUBBLES = 300;

    const bGeo =
      new THREE.BufferGeometry();

    const bPos =
      new Float32Array(
        BUBBLES * 3
      );

    const bSpd =
      new Float32Array(
        BUBBLES
      );

    for (
      let i = 0;
      i < BUBBLES;
      i++
    ) {

      bPos[i * 3] =
        (Math.random() - 0.5) *
        40;

      bPos[i * 3 + 1] =
        -(
          Math.random() *
            18 +
          2
        );

      bPos[i * 3 + 2] =
        (Math.random() - 0.5) *
        30;

      bSpd[i] =
        0.005 +
        Math.random() * 0.01;
    }

    bGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        bPos,
        3
      )
    );

    const bMat =
      new THREE.PointsMaterial({
        color: 0x8be5ff,
        size: 0.06,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      });

    const bubblePoints =
      new THREE.Points(
        bGeo,
        bMat
      );

    scene.add(
      bubblePoints
    );

    // ============================================================
    // FISH
    // ============================================================

    const createFishMesh =
      () => {

        const fishGroup =
          new THREE.Group();

        const bodyGeo =
          new THREE.ConeGeometry(
            0.12,
            0.5,
            5
          );

        bodyGeo.rotateZ(
          Math.PI / 2
        );

        const colors = [
          0xff6a13,
          0xf5b041,
          0x3498db,
          0xecf0f1,
        ];

        const randColor =
          colors[
            Math.floor(
              Math.random() *
                colors.length
            )
          ];

        const bodyMat =
          new THREE.MeshBasicMaterial({
            color: randColor,
          });

        const body =
          new THREE.Mesh(
            bodyGeo,
            bodyMat
          );

        fishGroup.add(
          body
        );

        const tailGeo =
          new THREE.ConeGeometry(
            0.08,
            0.2,
            4
          );

        tailGeo.rotateZ(
          -Math.PI / 2
        );

        const tailMat =
          new THREE.MeshBasicMaterial({
            color: randColor,
          });

        const tail =
          new THREE.Mesh(
            tailGeo,
            tailMat
          );

        tail.position.x =
          -0.3;

        fishGroup.add(
          tail
        );

        return fishGroup;
      };

    const fishCount = 24;

    const fishList:
      THREE.Group[] = [];

    const fishSpeeds:
      number[] = [];

    const fishWiggleSpeeds:
      number[] = [];

    for (
      let i = 0;
      i < fishCount;
      i++
    ) {

      const fish =
        createFishMesh();

      const x =
        (Math.random() - 0.5) *
        30;

      const y =
        -2 -
        Math.random() * 12;

      const z =
        (Math.random() - 0.5) *
        20;

      fish.position.set(
        x,
        y,
        z
      );

      const scale =
        0.4 +
        Math.random() * 0.9;

      fish.scale.set(
        scale,
        scale,
        scale
      );

      const direction =
        Math.random() >
        0.5
          ? 1
          : -1;

      const speed =
        (
          0.006 +
          Math.random() *
            0.014
        ) *
        direction;

      fishSpeeds.push(
        speed
      );

      fishWiggleSpeeds.push(
        8 +
          Math.random() *
            8
      );

      if (
        direction < 0
      ) {
        fish.rotation.y =
          Math.PI;
      }

      scene.add(fish);

      fishList.push(
        fish
      );
    }

    // ============================================================
    // LARGE UNDERWATER CREATURE
    // ============================================================

    const sharkGroup =
      new THREE.Group();

    const sharkBodyGeo =
      new THREE.ConeGeometry(
        0.45,
        2.5,
        6
      );

    sharkBodyGeo.rotateZ(
      Math.PI / 2
    );

    const sharkMat =
      new THREE.MeshBasicMaterial({
        color: 0x021122,
        transparent: true,
        opacity: 0.48,
      });

    const sharkBody =
      new THREE.Mesh(
        sharkBodyGeo,
        sharkMat
      );

    sharkGroup.add(
      sharkBody
    );

    const sharkTailGeo =
      new THREE.ConeGeometry(
        0.25,
        0.7,
        4
      );

    sharkTailGeo.rotateZ(
      -Math.PI / 2
    );

    const sharkTail =
      new THREE.Mesh(
        sharkTailGeo,
        sharkMat
      );

    sharkTail.position.x =
      -1.5;

    sharkGroup.add(
      sharkTail
    );

    const sharkDorsalGeo =
      new THREE.ConeGeometry(
        0.16,
        0.5,
        4
      );

    sharkDorsalGeo.rotateX(
      Math.PI / 4
    );

    const sharkDorsal =
      new THREE.Mesh(
        sharkDorsalGeo,
        sharkMat
      );

    sharkDorsal.position.set(
      -0.2,
      0.35,
      0
    );

    sharkGroup.add(
      sharkDorsal
    );

    sharkGroup.position.set(
      -15,
      -7,
      -12
    );

    scene.add(
      sharkGroup
    );

    // ============================================================
    // SCROLL PROGRESS
    // ============================================================

    const getScrollProgress =
      () => {

        const scrollEl =
          document.querySelector(
            ".ocean-scroll-container"
          ) as HTMLElement | null;

        const scrollTop =
          scrollEl
            ? scrollEl.scrollTop
            : window.scrollY;

        const vh =
          window.innerHeight;

        // IMPORTANT:
        // The entire dive now takes about
        // 4 viewport heights instead of 1.2.
        //
        // This makes the transition much slower
        // and more cinematic.

        return THREE.MathUtils.clamp(
          scrollTop /
            (vh * 4.0),
          0,
          1
        );
      };

    // ============================================================
    // ANIMATION
    // ============================================================

    const clock =
      new THREE.Clock();

    let animId: number;

    const animate = () => {

      const t =
        clock.getElapsedTime();

      const sp =
        getScrollProgress();

      // ========================================================
      // UPDATE SHADERS
      // ========================================================

      (
        skyMat.uniforms
          .uTime as THREE.IUniform
      ).value = t;

      (
        skyMat.uniforms
          .uScrollProgress as THREE.IUniform
      ).value = sp;

      (
        waterMat.uniforms
          .uTime as THREE.IUniform
      ).value = t;

      (
        waterMat.uniforms
          .uScrollProgress as THREE.IUniform
      ).value = sp;

      // ========================================================
      // CINEMATIC CAMERA DIVE
      // ========================================================

      let camY: number;
      let camZ: number;
      let lookY: number;

      // --------------------------------------------------------
      // PHASE 1
      // ABOVE WATER
      // --------------------------------------------------------

      if (sp < 0.20) {

        const p =
          THREE.MathUtils.smoothstep(
            sp / 0.20,
            0,
            1
          );

        camY =
          THREE.MathUtils.lerp(
            4.0,
            1.3,
            p
          );

        camZ =
          THREE.MathUtils.lerp(
            9.0,
            7.2,
            p
          );

        lookY =
          THREE.MathUtils.lerp(
            0,
            -0.2,
            p
          );
      }

      // --------------------------------------------------------
      // PHASE 2
      // APPROACH WATER
      // --------------------------------------------------------

      else if (sp < 0.38) {

        const p =
          THREE.MathUtils.smoothstep(
            (sp - 0.20) /
              0.18,
            0,
            1
          );

        camY =
          THREE.MathUtils.lerp(
            1.3,
            0.15,
            p
          );

        camZ =
          THREE.MathUtils.lerp(
            7.2,
            6.0,
            p
          );

        lookY =
          THREE.MathUtils.lerp(
            -0.2,
            -0.4,
            p
          );
      }

      // --------------------------------------------------------
      // PHASE 3
      // CROSSING THE WATER SURFACE
      // --------------------------------------------------------

      else if (sp < 0.48) {

        const p =
          THREE.MathUtils.smoothstep(
            (sp - 0.38) /
              0.10,
            0,
            1
          );

        camY =
          THREE.MathUtils.lerp(
            0.15,
            -1.8,
            p
          );

        camZ =
          THREE.MathUtils.lerp(
            6.0,
            5.5,
            p
          );

        lookY =
          THREE.MathUtils.lerp(
            -0.4,
            -1.6,
            p
          );
      }

      // --------------------------------------------------------
      // PHASE 4
      // DEEP UNDERWATER
      // --------------------------------------------------------

      else {

        const p =
          THREE.MathUtils.smoothstep(
            (sp - 0.48) /
              0.52,
            0,
            1
          );

        camY =
          THREE.MathUtils.lerp(
            -1.8,
            -12.0,
            p
          );

        camZ =
          THREE.MathUtils.lerp(
            5.5,
            3.2,
            p
          );

        lookY =
          THREE.MathUtils.lerp(
            -1.6,
            -12.5,
            p
          );
      }

      // Very subtle underwater/camera movement.
      const cameraMotion =
        Math.sin(t * 0.65) *
        0.025;

      camera.position.set(
        0,
        camY + cameraMotion,
        camZ
      );

      camera.lookAt(
        0,
        lookY,
        0
      );

      // ========================================================
      // ATMOSPHERE
      // ========================================================

      const clearColor =
        new THREE.Color();

      const fogColor =
        new THREE.Color();

      let fogDensity =
        0.005;

      // --------------------------------------------------------
      // ABOVE WATER
      // --------------------------------------------------------

      if (sp < 0.25) {

        const p =
          THREE.MathUtils.smoothstep(
            sp / 0.25,
            0,
            1
          );

        clearColor.lerpColors(
          new THREE.Color(
            0x7ec0ff
          ),
          new THREE.Color(
            0x4b9ed6
          ),
          p
        );

        fogColor.lerpColors(
          new THREE.Color(
            0xaad4ff
          ),
          new THREE.Color(
            0x6eb6df
          ),
          p
        );

        fogDensity =
          THREE.MathUtils.lerp(
            0.005,
            0.012,
            p
          );
      }

      // --------------------------------------------------------
      // WATER CROSSING
      // --------------------------------------------------------

      else if (sp < 0.48) {

        const p =
          THREE.MathUtils.smoothstep(
            (sp - 0.25) /
              0.23,
            0,
            1
          );

        clearColor.lerpColors(
          new THREE.Color(
            0x4b9ed6
          ),
          new THREE.Color(
            0x0a4b78
          ),
          p
        );

        fogColor.lerpColors(
          new THREE.Color(
            0x6eb6df
          ),
          new THREE.Color(
            0x0b527e
          ),
          p
        );

        fogDensity =
          THREE.MathUtils.lerp(
            0.012,
            0.035,
            p
          );
      }

      // --------------------------------------------------------
      // UNDERWATER
      // --------------------------------------------------------

      else {

        const p =
          THREE.MathUtils.smoothstep(
            (sp - 0.48) /
              0.52,
            0,
            1
          );

        clearColor.lerpColors(
          new THREE.Color(
            0x0a4b78
          ),
          new THREE.Color(
            0x021b3a
          ),
          p
        );

        fogColor.lerpColors(
          new THREE.Color(
            0x0b527e
          ),
          new THREE.Color(
            0x021b3a
          ),
          p
        );

        fogDensity =
          THREE.MathUtils.lerp(
            0.035,
            0.075,
            p
          );
      }

      renderer.setClearColor(
        clearColor,
        1
      );

      if (scene.fog) {

        scene.fog.color.copy(
          fogColor
        );

        (
          scene.fog as THREE.FogExp2
        ).density =
          fogDensity;
      }

      // ========================================================
      // BUBBLES
      // ========================================================

      const bubbleFade =
        THREE.MathUtils.smoothstep(
          sp,
          0.43,
          0.70
        );

      bMat.opacity =
        bubbleFade * 0.55;

      const posAttr =
        bGeo.attributes
          .position as THREE.BufferAttribute;

      for (
        let i = 0;
        i < BUBBLES;
        i++
      ) {

        posAttr.array[
          i * 3 + 1
        ] += bSpd[i];

        posAttr.array[
          i * 3
        ] +=
          Math.sin(
            t * 2 + i
          ) *
          0.002;

        if (
          posAttr.array[
            i * 3 + 1
          ] > 1
        ) {

          posAttr.array[
            i * 3 + 1
          ] =
            -18 -
            Math.random() * 6;
        }
      }

      posAttr.needsUpdate = true;

      // ========================================================
      // LIGHT RAYS
      // ========================================================

      rays.forEach(
        (ray, i) => {

          const rayAlpha =
            THREE.MathUtils.smoothstep(
              sp,
              0.35,
              0.65
            );

          (
            ray.material as THREE.MeshBasicMaterial
          ).opacity =
            rayAlpha *
            (
              0.05 +
              Math.sin(
                t * 0.8 + i
              ) *
              0.02
            );

          // Slow underwater movement.
          ray.rotation.y +=
            0.0005;
        }
      );

      // ========================================================
      // FISH
      // ========================================================

      fishList.forEach(
        (fish, i) => {

          const speed =
            fishSpeeds[i];

          fish.position.x +=
            speed;

          // Tail movement.
          const tail =
            fish.children[1];

          tail.rotation.y =
            Math.sin(
              t *
                fishWiggleSpeeds[i] +
                i
            ) *
            0.35;

          // Gentle vertical swimming.
          fish.position.y +=
            Math.sin(
              t * 0.5 + i
            ) *
            0.001;

          // Wrap horizontally.
          if (
            speed > 0 &&
            fish.position.x > 20
          ) {

            fish.position.x =
              -20;
          }

          if (
            speed < 0 &&
            fish.position.x < -20
          ) {

            fish.position.x =
              20;
          }
        }
      );

      // ========================================================
      // SHARK / LARGE CREATURE
      // ========================================================

      sharkGroup.position.x +=
        0.012;

      const sharkTailMesh =
        sharkGroup.children[1];

      sharkTailMesh.rotation.y =
        Math.sin(t * 2) *
        0.12;

      if (
        sharkGroup.position.x >
        22
      ) {

        sharkGroup.position.x =
          -22;
      }

      // ========================================================
      // RENDER
      // ========================================================

      renderer.render(
        scene,
        camera
      );

      animId =
        requestAnimationFrame(
          animate
        );
    };

    // Start animation.
    animate();

    // ============================================================
    // RESPONSIVE RESIZE
    // ============================================================

    const onResize = () => {

      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "resize",
      onResize
    );

    // ============================================================
    // CLEANUP
    // ============================================================

    return () => {

      cancelAnimationFrame(
        animId
      );

      window.removeEventListener(
        "resize",
        onResize
      );

      renderer.dispose();

      skyGeo.dispose();
      skyMat.dispose();

      waterGeo.dispose();
      waterMat.dispose();

      bGeo.dispose();
      bMat.dispose();

      fishList.forEach(
        (fish) => {

          fish.children.forEach(
            (child) => {

              if (
                child instanceof
                THREE.Mesh
              ) {

                child.geometry.dispose();

                (
                  child.material as THREE.Material
                ).dispose();
              }
            }
          );
        }
      );

      sharkGroup.children.forEach(
        (child) => {

          if (
            child instanceof
            THREE.Mesh
          ) {

            child.geometry.dispose();

            (
              child.material as THREE.Material
            ).dispose();
          }
        }
      );

      rays.forEach(
        (ray) => {

          ray.geometry.dispose();

          (
            ray.material as THREE.Material
          ).dispose();
        }
      );

      if (
        el.contains(
          renderer.domElement
        )
      ) {

        el.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0"
      style={{
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
