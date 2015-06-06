
var renderer, scene, camera, mouseVector, raycaster;

var buildings, geom, range = 50;

// kappa
var blueCube, redCube, yellowCube;

function initialize() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();
    camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    raycaster = new THREE.Raycaster();
    mouseVector = new THREE.Vector2();

    document.getElementById('gameDiv').appendChild(renderer.domElement);

    scene.add(generateGround());

    camera.position.y = -50;
    camera.rotation.x = 150 * (Math.PI/180);


    buildings = new THREE.Object3D();

    geom = new THREE.BoxGeometry( 50, 50, 50 );
    var mat = new THREE.MeshBasicMaterial({color:0xff0000});
    var cube = new THREE.Mesh( geom, mat );
    cube.position.x -= 200;
    buildings.add( cube );
    var mat = new THREE.MeshBasicMaterial({color:0xff0000});
    var cube = new THREE.Mesh( geom, mat );
    cube.position.x += 200;
    buildings.add( cube );

    scene.add(buildings);

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
    mouseVector.x = ( Mouse._coords[0] / window.innerWidth ) * 2 - 1;
    mouseVector.y = - ( Mouse._coords[1] / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouseVector, camera );
    var intersects = raycaster.intersectObjects( buildings.children );

    buildings.children.forEach(function( cube ) {
            cube.material.color.set( 0xff0000 );
    });

    for ( var i = 0; i < intersects.length; i++ ) {
        intersects[ i ].object.material.color.set( 0xffffff );
    }

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