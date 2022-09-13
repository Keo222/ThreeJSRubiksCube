import { useLayoutEffect } from "react";
import * as THREE from "three";

// Functions
import { resizeRendererToDisplaySize } from "utils/functions";

// Styled Components
import { Canvas } from "styled/canvas";

const Cone = () => {
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

    // Add Light to Scene
    const lightColor = 0xffffff;
    const intensity = 2;
    const light1 = new THREE.DirectionalLight(lightColor, intensity);
    light1.position.set(-4, 2, 4);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(lightColor, intensity);
    light2.position.set(4, 2, -4);
    scene.add(light2);

    // Cone Geometry
    const radius = 0.5;
    const height = 1;
    const radialSegments = 100;
    const coneGeometry = new THREE.ConeGeometry(
      radius,
      height,
      radialSegments
    );

    // Cone Mesh
    const color = 0x4488aa;
    const material = new THREE.MeshPhongMaterial({ color });
    const cone = new THREE.Mesh(coneGeometry, material);
    scene.add(cone);
    cone.position.x = 0;

    // Render Scene & Camera
    function coneRender(time: number) {
      time *= 0.001;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      const speed = 1;
      const rotation = time * speed;
      cone.rotation.x = rotation;
      cone.rotation.y = rotation;
      cone.rotation.z = rotation / 2;

      renderer.render(scene, camera);

      requestAnimationFrame(coneRender);
    }
    requestAnimationFrame(coneRender);
  }, []);
  return <Canvas id="c" />;
};

export default Cone;
