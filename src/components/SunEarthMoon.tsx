import { useLayoutEffect } from "react";
import * as THREE from "three";

// Functions
import { resizeRendererToDisplaySize } from "utils/functions";

// Styled Components
import { Canvas } from "styled/canvas";

type Props = {};

const SunEarthMoon = (props: Props) => {
  useLayoutEffect(() => {
    const canvas = document.querySelector("#c") as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({ canvas });

    // Camera
    const fov = 40;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // Scene
    const scene = new THREE.Scene();

    // Light
    {
      const color = 0xffffff;
      const intensity = 3;
      const light = new THREE.PointLight(color, intensity);
      scene.add(light);
    }

    // Space Objects
    const objects: Array<THREE.Object3D> = [];

    // one sphere for everything
    const radius = 1;
    const widthSegments = 50;
    const heightSegments = 50;
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    // Solar System (empty node)
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    // Sun
    const sunMaterial = new THREE.MeshPhongMaterial({
      emissive: 0xffff00,
    });
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    // Earth Orbit
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    // Earth
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
    });
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    // Moon Orbit
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    // Moon
    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0x888888,
      emissive: 0x222222,
    });
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(0.5, 0.5, 0.5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    const render = (time: number) => {
      time *= 0.001;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      objects.forEach((obj) => {
        obj.rotation.y = time;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }, []);
  return <Canvas id="c" />;
};

export default SunEarthMoon;
