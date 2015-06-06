var renderer, scene, camera;
var gameLogic;
var plane = null;

function initSetup(){
    renderer = new THREE.WebGLRenderer({ antialias: true });
    scene = new THREE.Scene();
    camera = new Camera(75, window.innerWidth/window.innerHeight);
    gameLogic = new GameLogic();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById('gameDiv').appendChild(renderer.domElement);


    // Add Light
    scene.add(this.generateLight());
    scene.add(new THREE.AmbientLight(0xffffff));

    var heightmap = new Image();
    heightmap.src = "resources/images/heightmap.png";
    heightmap.onload = function () {
        plane = generateGround(heightmap);
        scene.add(plane);
    }

    var building = new Structure();
    scene.add(building.mesh);

    onKeyFrame();
};

function generateLight(){
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set( 0, 50, 0 ).normalize();
    return light;
};

function generateGround(heightmapImage){
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
};

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

function onKeyFrame(){
    renderer.render(scene, camera.view);
    gameLogic.detectCameraMovement();
    if(Mouse._leftButton) {
        gameLogic.placeBuilding(camera.view, plane);
        console.log('Building Placed');
        Mouse._leftButton = false;
    }
    requestAnimationFrame(onKeyFrame);
};