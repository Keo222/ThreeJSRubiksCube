import React, { useState, useLayoutEffect, useEffect } from "react";
import * as THREE from "three";

// Functions
import { resizeRendererToDisplaySize } from "utils/functions";
import { outerCubesInfo, createAndAttachCubes } from "utils/RubiksHelpers";

// Styled Components
import { Canvas } from "styled/canvas";

const Rubiks = () => {
  const [xTurn, setXTurn] = useState(0);
  const [yTurn, setYTurn] = useState(0);

  function handleArrowKeys(e: KeyboardEvent) {
    // e.stopPropagation();
    if (e.key === "ArrowUp") {
      setXTurn((oldX) => oldX - 0.5);
      console.log("UP");
    } else if (e.key === "ArrowDown") {
      setXTurn((oldX) => oldX + 0.5);
      console.log("DOWN");
    } else if (e.key === "ArrowLeft") {
      setYTurn((oldY) => oldY + 0.5);
      console.log("LEFT");
    } else if (e.key === "ArrowRight") {
      setYTurn((oldY) => oldY - 0.5);
      console.log("RIGHT");
    }
  }

  useEffect(() => {
    // const canvas = document.querySelector("#c") as HTMLCanvasElement;
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

      cubes[0].rotation.x = (xTurn % 2) * Math.PI;
      cubes[0].rotation.y = (yTurn % 2) * Math.PI;
      // cubes[0].rotation.x = 0 * Math.PI;
      // cubes[0].rotation.y = 0 * Math.PI;

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, [xTurn, yTurn]);
  return (
    <>
      <Canvas id="c" />
    </>
  );
};

export default Rubiks;
