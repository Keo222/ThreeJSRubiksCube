import * as THREE from "three";

const cubeColors = [
  "red",
  "darkorange",
  "white",
  "yellow",
  "green",
  "blue",
];

type TSixBooleans = [boolean, boolean, boolean, boolean, boolean, boolean];
type TPosition = [number, number, number];

export const outerCubesInfo: { faces: TSixBooleans; pos: TPosition }[] = [
  // FTL
  { faces: [false, true, true, false, true, false], pos: [-1, 1, 1] },
  // FTM
  { faces: [false, false, true, false, true, false], pos: [0, 1, 1] },
  // FTR
  { faces: [true, false, true, false, true, false], pos: [1, 1, 1] },
  // FML
  { faces: [false, true, false, false, true, false], pos: [-1, 0, 1] },
  // FMM
  { faces: [false, false, false, false, true, false], pos: [0, 0, 1] },
  // FMR
  { faces: [true, false, false, false, true, false], pos: [1, 0, 1] },
  // FBL
  { faces: [false, true, false, true, true, false], pos: [-1, -1, 1] },
  // FBM
  { faces: [false, false, false, true, true, false], pos: [0, -1, 1] },
  // FBR
  { faces: [true, false, false, true, true, false], pos: [1, -1, 1] },
  // MTL
  { faces: [false, true, true, false, false, false], pos: [-1, 1, 0] },
  // MTM
  { faces: [false, false, true, false, false, false], pos: [0, 1, 0] },
  // MTR
  { faces: [true, false, true, false, false, false], pos: [1, 1, 0] },
  // MML
  { faces: [false, true, false, false, false, false], pos: [-1, 0, 0] },
  // MMR
  { faces: [true, false, false, false, false, false], pos: [1, 0, 0] },
  // MBL
  { faces: [false, true, false, true, false, false], pos: [-1, -1, 0] },
  // MBM
  { faces: [false, false, false, true, false, false], pos: [0, -1, 0] },
  // MBR
  { faces: [true, false, false, true, false, false], pos: [1, -1, 0] },
  // BTL
  { faces: [false, true, true, false, false, true], pos: [-1, 1, -1] },
  // BTM
  { faces: [false, false, true, false, false, true], pos: [0, 1, -1] },
  // BTR
  { faces: [true, false, true, false, false, true], pos: [1, 1, -1] },
  // BML
  { faces: [false, true, false, false, false, true], pos: [-1, 0, -1] },
  // BMM
  { faces: [false, false, false, false, false, true], pos: [0, 0, -1] },
  // BMR
  { faces: [true, false, false, false, false, true], pos: [1, 0, -1] },
  // BBL
  { faces: [false, true, false, true, false, true], pos: [-1, -1, -1] },
  // BBM
  { faces: [false, false, false, true, false, true], pos: [0, -1, -1] },
  // BBR
  { faces: [true, false, false, true, false, true], pos: [1, -1, -1] },
];

const cubeGeometry = new THREE.BoxGeometry(0.92, 0.92, 0.92);
cubeGeometry.boundingSphere = new THREE.Sphere(
  new THREE.Vector3(0, 0, 0),
  0.5
);
cubeGeometry.computeBoundingSphere();

export function createAndAttachCubes(
  cubes: { faces: TSixBooleans; pos: TPosition }[],
  parent: THREE.Mesh
) {
  cubes.forEach((cube) => {
    const materials = makeCubeMaterials(cube.faces);
    const cubeMesh = new THREE.Mesh(cubeGeometry, materials);
    cubeMesh.position.set(...cube.pos);
    parent.add(cubeMesh);
  });
}

function makeCubeMaterials(faces: TSixBooleans) {
  const materials = faces.map((face, i) => {
    if (face) {
      return new THREE.MeshBasicMaterial({ color: cubeColors[i] });
    } else {
      return new THREE.MeshBasicMaterial({ color: 0x000000 });
    }
  });
  return materials;
}
