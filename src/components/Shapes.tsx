import { useLayoutEffect } from "react";
import * as THREE from "three";

// Styled Components
import { Canvas } from "styled/canvas";

type Props = {};

const Shapes = (props: Props) => {
  useLayoutEffect(() => {
    // Camera Setup
    const fov = 40;
    const aspect = 2;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 120;

    // Create Scene
    const scene = new THREE.Scene();

    // Add Light to Scene
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // Add Objects Function
    const objects = [];
    const spread = 15;

    function addObject(x: number, y: number, obj: THREE.Object3D) {
      obj.position.x = x * spread;
      obj.position.y = y * spread;

      scene.add(obj);
      objects.push(obj);
    }

    function createMaterial() {
      const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
      });

      const hue = Math.random();
      const saturation = 1;
      const luminance = 0.5;
      material.color.setHSL(hue, saturation, luminance);

      return material;
    }

    function addSolidGeometry(x: number, y: number, geometry: any) {
      const mesh = new THREE.Mesh(geometry, createMaterial());
      addObject(x, y, mesh);
    }
    addSolidGeometry(1, 1, new THREE.BoxGeometry(2, 2, 2));
  }, []);

  return <Canvas id="c" />;
};

export default Shapes;
