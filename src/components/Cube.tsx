import React, { useLayoutEffect } from "react";
import * as THREE from "three";

// Functions
import { resizeRendererToDisplaySize } from "utils/functions";

// Styled Components
import { Canvas } from "../styled/canvas";

const Cube = () => {
  // const canvas = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const canvas = document.querySelector("#c") as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas });
    // Camera
    const fov = 75;
    const aspect = 2;
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    // Scene
    const scene = new THREE.Scene();
    // Box
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // Make Cubes Function
    function makeInstance(
      geometry: THREE.BoxGeometry,
      color: THREE.ColorRepresentation,
      x: number
    ) {
      const material = new THREE.MeshPhongMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      cube.position.x = x;

      return cube;
    }

    const cubes = [
      makeInstance(geometry, 0x44aa88, 0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844, 2),
    ];

    // Add Light to Scene
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Render Scene & Camera
    function cubeRender(time: number) {
      time *= 0.001; // convert time to seconds

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.forEach((cube, index) => {
        const speed = 1 + index * 0.1;
        const rotation = time * speed;
        cube.rotation.x = rotation;
        cube.rotation.y = rotation;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(cubeRender);
    }
    requestAnimationFrame(cubeRender);
  }, []);

  return <Canvas id="c" />;
};

export default Cube;
