const getBox = (w, h, d) => {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const getPlane = (size) => {
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff0,
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

//recursively call itself so as to allow for interactivity
const update = (renderer, scene, camera) => {
  renderer.render(scene, camera);

  var plane = scene.getObjectByName("plane-1");
  plane.rotation.y += 0.001;
  plane.rotation.z += 0.001;

  scene.traverse((child) => {
    child.scale.x += 0.001;
  });

  requestAnimationFrame(() => {
    update(renderer, scene, camera);
  });
};

const init = () => {
  var scene = new THREE.Scene();

  var box = getBox(1, 1, 1);
  var plane = getPlane(4);
  plane.name = "plane-1";

  //position the center of the box so that it sits on the plane

  //need this math to communicate in degrees rather than radiants
  plane.rotation.x = Math.PI / 2;

  scene.add(plane);
  plane.add(box);
  box.position.y = box.geometry.parameters.height / 2;

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 5;
  camera.position.x = 1;
  camera.position.y = 2;

  camera.lookAt(new THREE.Vector3(0, 0, 0)); //look at the center of the scene

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement);
  update(renderer, scene, camera);
  //   renderer.render(scene, camera);

  return scene;
};

const scene = init();
