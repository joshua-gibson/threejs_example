const getBox = (w, h, d) => {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshPhongMaterial({
    color: "rgb(120,120,120)",
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const getSphere = (size) => {
  var geometry = new THREE.SphereGeometry(size, 24, 24);
  var material = new THREE.MeshBasicMaterial({
    color: "rgb(255,255,255)",
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const getPlane = (size) => {
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshPhongMaterial({
    color: "rgb(120,120,120)",
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
};

const getPointLight = (intensity) => {
  var light = new THREE.PointLight(0xffffff, intensity);
  return light;
};

//recursively call itself so as to allow for interactivity
const update = (renderer, scene, camera) => {
  renderer.render(scene, camera);

  requestAnimationFrame(() => {
    update(renderer, scene, camera);
  });
};

const init = () => {
  var scene = new THREE.Scene();

  var enableFog = false;
  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xfffff, 0.2);
  }
  var box = getBox(1, 1, 1);
  var plane = getPlane(20);
  var pointLight = getPointLight(1);
  var sphere = getSphere(0.05);
  plane.name = "plane-1";

  //need this math to communicate in degrees rather than radiants
  plane.rotation.x = Math.PI / 2;
  pointLight.position.y = 2;
  box.position.y = box.geometry.parameters.height / 2;

  scene.add(plane);
  scene.add(box);
  scene.add(pointLight);
  pointLight.add(sphere);

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
  renderer.setClearColor("rgb(120, 120, 120)");
  document.getElementById("webgl").appendChild(renderer.domElement);
  update(renderer, scene, camera);

  return scene;
};

const scene = init();
