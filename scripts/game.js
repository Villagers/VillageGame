
var renderer, scene, camera, mouseVector, raycaster, SELECTED, INTERSECTED, offset, groundMesh;

var buildings, geom, range = 50;

// kappa
var blueCube, redCube, yellowCube;

function initialize() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();
    camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    raycaster = new THREE.Raycaster();
    mouseVector = new THREE.Vector2();
    offset = new THREE.Vector3();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('gameDiv').appendChild(renderer.domElement);

    // Add Light
    scene.add(generateLight());
    scene.add(new THREE.AmbientLight(0xffffff));

    var heightmap = new Image();
    heightmap.src = "resources/images/heightmap.png";
    heightmap.onload = function () {
        scene.add(generateGround(heightmap));
    }

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
    light.position.set( 0, 50, 0 ).normalize();
    return light;
}

function generateGround(heightmapImage) {
    var groundPlane = new THREE.PlaneBufferGeometry(1000, 1000, 597, 597);

    // Set Ground height
    groundPlane.dynamic = true;
    var data = getHeightData(heightmapImage);
    var vertices = groundPlane.attributes.position.array;
    for (var i = 0; i < data.length; i++) {
         vertices[2 + i*3] = data[i];
    }
    groundPlane.attributes.position.needsUpdate = true;

    // Set Texture
    var groundTexture = THREE.ImageUtils.loadTexture("resources/images/grass5.jpg");
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(100, 100);
    groundTexture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.MeshPhongMaterial( { map : groundTexture } );
    var groundMesh = new THREE.Mesh(groundPlane, material);

    // Rotations
    groundMesh.rotation.x = Math.PI/2;
    return groundMesh;
}

function animate() {
    renderer.render(scene, camera);
    cameraMovement();
    buildingMovement();
    requestAnimationFrame(animate);
}

function cameraMovement() {
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

function buildingMovement() {
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

    // if(Mouse._leftButton == true){
    //     var vector = new THREE.Vector3( mouseVector.x, mouseVector.y, 0.5 ).unproject( camera );
    //     raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    //     var intersects = raycaster.intersectObjects( buildings.children );
    //     if ( intersects.length > 0 ) {
    //         SELECTED = intersects[ 0 ].object;
    //         var intersects = raycaster.intersectObject( groundMesh );
    //         offset.copy( intersects[ 0 ].point ).sub( groundMesh.position );
    //     }
    // }
    // if(Mouse._leftButton == false){
    //     if ( INTERSECTED ) {
    //         groundMesh.position.copy( INTERSECTED.position );
    //         SELECTED = null;
    //     }
    // }

    // raycaster.setFromCamera( mouseVector, camera );

    // if ( SELECTED ) {
    //     var intersects = raycaster.intersectObject( groundMesh );
    //     SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
    //     return;
    // }

    // var intersects = raycaster.intersectObjects( buildings.children );

    // if ( intersects.length > 0 ) {
    //     if ( INTERSECTED != intersects[ 0 ].object ) {
    //         if ( INTERSECTED ) {
    //             INTERSECTED.material.color.set( 0xffffff );
    //         }
    //         INTERSECTED = intersects[ 0 ].object;
    //         INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
    //         groundMesh.position.copy( INTERSECTED.position );
    //         groundMesh.lookAt( camera.position );
    //     }
    // } else {
    //     if ( INTERSECTED ){
    //         INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
    //     } 
    //     INTERSECTED = null;
    // }
}