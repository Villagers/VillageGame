
var renderer, scene, camera;

function initialize() {

    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    camera  = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    document.getElementById('gameDiv').appendChild( renderer.domElement );

    scene.add(new THREE.AmbientLight(0xeef0ff));
    scene.add(generateLight());
    scene.add(generateGround());
    renderer.render(scene, camera);
}

function generateLight() {
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set( 0, 1, 1 ).normalize();
    return light;
}

function generateGround() {
    var geometry = new THREE.BoxGeometry( 10, 10, 10);
    var texture = THREE.ImageUtils.loadTexture("resources/images/worldmap800.jpg");

    var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
    var mesh = new THREE.Mesh( geometry, material );
    return mesh;
}

function generateBox() {
    var geometry = new THREE.BoxGeometry( 10, 10, 10);
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('resources/images/crate.jpg') } );
    mesh = new THREE.Mesh(geometry, material );
    mesh.position.z = -50;
    return mesh;
}