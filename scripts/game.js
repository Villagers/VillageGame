
var renderer, scene, camera;

// kappa
var blueCube, redCube, yellowCube;

function initialize() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();
    camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    document.getElementById('gameDiv').appendChild(renderer.domElement);

    var heightmap = new Image();
    heightmap.src = "resources/images/heightmap.png";
    heightmap.onload = function () {
        scene.add(generateGround(heightmap));
    }

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

//return array with height data from img
function getHeightData(heightmapImage,scale) {
  
 if (scale == undefined) scale=1;
  
    var canvas = document.createElement( 'canvas' );
    canvas.width = heightmapImage.width;
    canvas.height = heightmapImage.height;
    var context = canvas.getContext( '2d' );
 
    var size = heightmapImage.width * heightmapImage.height;
    var data = new Float32Array( size );
 
    context.drawImage(heightmapImage,0,0);
 
    for ( var i = 0; i < size; i ++ ) {
        data[i] = 0
    }
 
    var imgd = context.getImageData(0, 0, heightmapImage.width, heightmapImage.height);
    var pix = imgd.data;
 
    var j=0;
    for (var i = 0; i<pix.length; i +=4) {
        var all = pix[i]+pix[i+1]+pix[i+2];
        data[j++] = all/(12*scale);
    }
     
    return data;
}

function generateLight() {
    var light = new THREE.DirectionalLight(0xffffff);
    // light.position.set( 0, 0, 0 ).normalize();
    return light;
}


function generateGround(heightmapImage) {
    var groundPlane = new THREE.PlaneBufferGeometry(1000, 1000, 597, 597);
    groundPlane.dynamic = true;
    // Set Ground height
    var data = getHeightData(heightmapImage);
    var vertices = groundPlane.attributes.position.array;
    console.log(vertices.length);
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
         vertices[2 + i*3] = data[i];
    }
    groundPlane.attributes.position.needsUpdate = true;

    // Set Texture
    var groundTexture = THREE.ImageUtils.loadTexture("resources/images/grass5.jpg");
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(10, 10);

    var material = new THREE.MeshBasicMaterial( { map: groundTexture, side: THREE.DoubleSide } );
    var groundMesh = new THREE.Mesh(groundPlane, material);

    // Rotations
    groundMesh.rotation.x = Math.PI/2;
    return groundMesh;
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