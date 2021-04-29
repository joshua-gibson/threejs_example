function getBoxGrid(amount, separationMultiplier) {
  var group = new THREE.Group();

  for (var i = 0; i < amount; i++) {
    var obj = getBox(1, 1, 1);
    obj.position.x = i * separationMultiplier;
    obj.position.y = obj.geometry.parameters.height / 2;
    group.add(obj);
    for (var j = 1; j < amount; j++) {
      var obj = getBox(1, 1, 1);
      obj.position.x = i * separationMultiplier;
      obj.position.y = obj.geometry.parameters.height / 2;
      obj.position.z = j * separationMultiplier;
      group.add(obj);
    }
  }

  group.position.x = -(separationMultiplier * (amount - 1)) / 2;
  group.position.z = -(separationMultiplier * (amount - 1)) / 2;

  return group;
}

const getBox = (w, h, d) => {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshPhongMaterial({
    color: "rgb(120,120,120)",
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
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
  mesh.receiveShadow = true;
  return mesh;
};

const getPointLight = (intensity) => {
  var light = new THREE.PointLight(0xffffff, intensity);
  light.castShadow = true;
  return light;
};

const getSpotLight = (intensity) => {
  var light = new THREE.SpotLight(0xffffff, intensity);
  light.castShadow = true;
  light.shadow.bias = 0.001;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  return light;
};

//recursively call itself so as to allow for interactivity
const update = (renderer, scene, camera, controls) => {
  renderer.render(scene, camera);

  controls.update();
  requestAnimationFrame(() => {
    update(renderer, scene, camera, controls);
  });
};

const init = () => {
  var scene = new THREE.Scene();
  var gui = new dat.GUI();

  var enableFog = false;
  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xfffff, 0.2);
  }

  var plane = getPlane(30);
  var spotLight = getSpotLight(1);
  var sphere = getSphere(0.05);
  var boxGrid = getBoxGrid(10, 1.5);
  plane.name = "plane-1";

  //need this math to communicate in degrees rather than radiants
  plane.rotation.x = Math.PI / 2;
  spotLight.position.y = 4;
  spotLight.intensity = 2;

  gui.add(spotLight, "intensity", 0, 10);
  gui.add(spotLight.position, "y", 0, 20);
  gui.add(spotLight.position, "x", 0, 20);
  gui.add(spotLight.position, "z", 0, 20);
  gui.add(spotLight, "penumbra", 0, 1);

  scene.add(plane);
  scene.add(spotLight);
  scene.add(boxGrid);
  spotLight.add(sphere);

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
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("rgb(120, 120, 120)");
  document.getElementById("webgl").appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);

  return scene;
};

const scene = init();
