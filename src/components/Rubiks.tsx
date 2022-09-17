import React, { useState, useLayoutEffect, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Functions
import { resizeRendererToDisplaySize } from "utils/functions";
import { outerCubesInfo, createAndAttachCubes } from "utils/RubiksHelpers";

// Styled Components
import { Canvas } from "styled/canvas";

const Rubiks = () => {
  const [pos, setPos] = useState({ x: 0, y: 0, z: 0 });

  function handleArrowKeys(e: KeyboardEvent) {
    if (e.key === "ArrowUp") {
      setPos((oldState) => {
        return { ...oldState, x: oldState.x - 0.5 };
      });
    } else if (e.key === "ArrowDown") {
      setPos((oldState) => {
        return { ...oldState, x: oldState.x + 0.5 };
      });
    } else if (e.key === "ArrowLeft") {
      setPos((oldState) => {
        if (oldState.x % 2 === 0) {
          return { ...oldState, y: oldState.y - 0.5 };
        } else if (oldState.x % 1 === 0) {
          return { ...oldState, y: oldState.y + 0.5 };
        } else {
          return { ...oldState, z: oldState.z - 0.5 };
        }
      });
    } else if (e.key === "ArrowRight") {
      setPos((oldState) => {
        if (oldState.x % 2 === 0) {
          return { ...oldState, y: oldState.y + 0.5 };
        } else if (oldState.x % 1 === 0) {
          return { ...oldState, z: oldState.z - 0.5 };
        } else {
          return { ...oldState, z: oldState.z + 0.5 };
        }
      });
    } else if (e.key === "a") {
      setPos((oldState) => {
        return { ...oldState, z: oldState.z + 0.5 };
      });
    } else if (e.key === "d") {
      setPos((oldState) => {
        return { ...oldState, z: oldState.z - 0.5 };
      });
    }
  }

  useEffect(() => {
    document.addEventListener("keyup", handleArrowKeys);

    return () => {
      document.removeEventListener("keyup", handleArrowKeys);
    };
  }, []);

  useLayoutEffect(() => {
    const canvas = document.querySelector("#c") as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    // Scene
    const scene = new THREE.Scene();

    // DEBUG AXES HELPER
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Camera
    const fov = 80;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.x = -4;
    camera.position.y = 3.5;
    camera.position.z = 6;
    camera.lookAt(scene.position);

    // Cube Geometry
    const cubeGeometry = new THREE.BoxGeometry(0.92, 0.92, 0.92);

    // Center Cube
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0x000,
    });

    const centerCube = new THREE.Mesh(cubeGeometry, centerMaterial);
    scene.add(centerCube);

    // Additional Cubes
    createAndAttachCubes(outerCubesInfo, centerCube);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Render
    const render = (time: number) => {
      time *= 0.001;
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      scene.rotation.x = (pos.x % 2) * Math.PI;
      scene.rotation.y = (pos.y % 2) * Math.PI;
      scene.rotation.z = (pos.z % 2) * Math.PI;
      // cubes[0].rotation.x = 0 * Math.PI;
      // cubes[0].rotation.y = 0 * Math.PI;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, [pos]);
  return (
    <>
      <Canvas id="c" />
    </>
  );
};

export default Rubiks;
