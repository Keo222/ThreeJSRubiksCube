import { useLayoutEffect } from "react";
import * as THREE from "three";

// Functions
import { resizeRendererToDisplaySize } from "utils/functions";
import { outerCubesInfo, createAndAttachCubes } from "utils/RubiksHelpers";

// Styled Components
import { Canvas } from "styled/canvas";

const Rubiks = () => {
  useLayoutEffect(() => {
    const canvas = document.querySelector("#c") as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas });

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const fov = 80;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 7;

    // Cube List
    const cubes: THREE.Mesh[] = [];

    // Cube Geometry
    const cubeGeometry = new THREE.BoxGeometry(0.92, 0.92, 0.92);

    // Center Cube
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0x000,
    });

    const centerCube = new THREE.Mesh(cubeGeometry, centerMaterial);
    scene.add(centerCube);
    cubes.push(centerCube);

    // Additional Cubes
    createAndAttachCubes(outerCubesInfo, centerCube);

    // Render
    const render = (time: number) => {
      time *= 0.001;
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes[0].rotation.x = 0.2 * Math.PI;
      cubes[0].rotation.y = 0.25 * Math.PI;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, []);
  return (
    <>
      <Canvas id="c" />
    </>
  );
};

export default Rubiks;
