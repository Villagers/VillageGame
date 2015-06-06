
var renderer, scene, camera;

function initialize() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();
    camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    document.getElementById('gameDiv').appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xeef0ff));
    scene.add(generateLight());
    scene.add(generateGround());

    camera.position.y = -50;
    camera.rotation.x = 150 * (Math.PI/180);

    animate();
}

function generateLight() {
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set( 0, 1, 1 ).normalize();
    return light;
}

function generateGround() {
    var geometry = new THREE.PlaneBufferGeometry(300, 300);
    var texture = THREE.ImageUtils.loadTexture("resources/images/worldmap800.jpg");

    var material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
    var mesh = new THREE.Mesh(geometry, material);

    mesh.rotation.x = Math.PI/2;
    return mesh;
}

function animate(){

    renderer.render(scene, camera);
    cameraPhysics();
    requestAnimationFrame(animate);
}

function cameraPhysics()
{
    if (Key.isDown(Key.A))      
    {
        camera.rotation.z += 0.1;
    }
    if (Key.isDown(Key.D))      
    {
        camera.rotation.z -= 0.1;
    }
    if (Key.isDown(Key.W))      
    {
        camera.rotation.x -= 0.1;
    }
    if (Key.isDown(Key.S))      
    {
        camera.rotation.x += 0.1;
    }

    var pc = Mouse.panCamera();
    if (pc == Mouse.UP){
        camera.position.z += 0.5;
    }
    if (pc == Mouse.DOWN){
        camera.position.z -= 0.5;
    }
    if (pc == Mouse.LEFT){
        camera.position.x -= 0.5;
    }
    if (pc == Mouse.RIGHT){
        camera.position.x += 0.5;
    }

    var sc = Mouse.scrollCamera();
    if(sc == Mouse.OUT){
        camera.position.y -= 1;
    }
    if(sc == Mouse.IN){
        camera.position.y += 1;
    }
}