
var renderer, scene, camera;

// kappa
var blueCube, redCube, yellowCube;

function initialize() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();
    camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    document.getElementById('gameDiv').appendChild(renderer.domElement);

    scene.add(generateGround());

    camera.position.y = -50;
    camera.rotation.x = 150 * (Math.PI/180);

    // Blue Cube
    var geometry = new THREE.BoxGeometry( 50, 50, 50 );
    var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    blueCube = new THREE.Mesh( geometry, material );
    blueCube.position.x -= 200;
    blueCube.position.z += 200;
    scene.add( blueCube );
    // Red Cube
    var geometry = new THREE.BoxGeometry( 50, 50, 50 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    redCube = new THREE.Mesh( geometry, material );
    redCube.position.x += 200;
    redCube.position.z += 200;
    scene.add( redCube );
    // Yellow Cube
    var geometry = new THREE.BoxGeometry( 50, 50, 50 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    yellowCube = new THREE.Mesh( geometry, material );
    yellowCube.position.x -= 200;
    scene.add( yellowCube );

    animate();
}

function generateGround() {
    var geometry = new THREE.PlaneBufferGeometry(1000, 1000);
    var texture = THREE.ImageUtils.loadTexture("resources/images/grass5.jpg");
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
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
    var pc = Mouse.panCamera();
    if (pc == Mouse.UP || Key.isDown(Key.W)){
        camera.position.z += 5;
    }
    if (pc == Mouse.DOWN || Key.isDown(Key.S)){
        camera.position.z -= 5;
    }
    if (pc == Mouse.LEFT || Key.isDown(Key.A)){
        camera.position.x -= 5;
    }
    if (pc == Mouse.RIGHT || Key.isDown(Key.D)){
        camera.position.x += 5;
    }

    var sc = Mouse.scrollCamera();
    if(sc == Mouse.OUT){
        camera.position.y -= 1;
    }
    if(sc == Mouse.IN){
        camera.position.y += 1;
    }
}