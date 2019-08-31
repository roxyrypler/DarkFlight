var scene = null;
var camera = null;
var renderer = null;
let model1 = null;
let model2 = null;
let model3 = null;
var mixer1 = null;
var mixer2 = null;
var mixer3 = null;
let rainGeo = null;
let rain = null;
let rainCount = 15000;
var clock = new THREE.Clock();
let canvasHolder = document.getElementById('threeDContent');
let birdOffsets = {
    x: 2,
    y: 0.51,
    z: -5
};


function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasHolder.appendChild(renderer.domElement);

    var pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(-1, 10, -20);
    scene.add(pointLight);

    camera.position.z = 5;
    camera.position.y = 1;
}

function loadScene() {
    // Instantiate a loader
    var loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load('../3D/models/RavenBone.glb',
        function (gltf) {
            model1 = gltf.scene;

            model1.rotation.y = 1;

            model1.position.y = 2.5 + birdOffsets.y;
            model1.position.z = -7 + birdOffsets.z;
            model1.position.x = 0 + birdOffsets.x;

            scene.add(model1);

            mixer1 = new THREE.AnimationMixer(model1);
            mixer1.clipAction(gltf.animations[0]).play();
            mixer1.timeScale = 8;
        });

    loader.load('../3D/models/RavenBone.glb',
        function (gltf) {
            model2 = gltf.scene;

            model2.rotation.y = 1;

            model2.position.y = 2 + birdOffsets.y;
            model2.position.z = -8 + birdOffsets.z;
            model2.position.x = -5 + birdOffsets.x;

            scene.add(model2);

            mixer2 = new THREE.AnimationMixer(model2);
            mixer2.clipAction(gltf.animations[0]).play();
            mixer2.timeScale = 7.5;
        });

    loader.load('../3D/models/RavenBone.glb',
        function (gltf) {
            model3 = gltf.scene;

            model3.rotation.y = .8;

            model3.position.y = 0 + birdOffsets.y;
            model3.position.z = -8 + birdOffsets.z;
            model3.position.x = -2 + birdOffsets.x;

            scene.add(model3);

            mixer3 = new THREE.AnimationMixer(model3);
            mixer3.clipAction(gltf.animations[0]).play();
            mixer3.timeScale = 7.9;

            render();
        });

    rainGeo = new THREE.Geometry();
    for (let i = 0; i < rainCount; i++) {
        rainDrop = new THREE.Vector3(
            Math.random() * 400 - 200,
            Math.random() * 500 - 250,
            Math.random() * 400 - 200
        );
        rainDrop.velocity = {};
        rainDrop.velocity = 0;
        rainGeo.vertices.push(rainDrop);
    }
    rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
    });
    rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

let floatingSpeed = 0.1;
let floatingHeight = 2;

function render() {
    requestAnimationFrame(render);
    var delta = clock.getDelta();
    if (mixer1 != null) {
        mixer1.update(delta);
    };
    if (mixer2 != null) {
        mixer2.update(delta);
    };
    if (mixer3 != null) {
        mixer3.update(delta);
    };

    rainGeo.vertices.forEach(p => {
        p.velocity -= 0.001 + Math.random() * 0.001;
        p.y += p.velocity;
        if (p.y < -200) {
            p.y = 200;
            p.velocity = 0;
        }
    });
    rainGeo.verticesNeedUpdate = true;
    rain.rotation.y += 0.0002;

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x += (mouseX - camera.position.x) * 0.00005;
    camera.position.y += (mouseY - camera.position.y) * 0.00005;
    //set up camera position
    camera.lookAt(scene.position);
};

init3D();
loadScene();