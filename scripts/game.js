function GameLogic() {

    this.placeBuilding = function(view, plane) {
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2();
        var offset = new THREE.Vector3();

        var building = new Structure();

        mouseVector.x = (Mouse._coords[0] / window.innerWidth) * 2 - 1;
        mouseVector.y = (Mouse._coords[1] / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera( mouseVector, view );
        var objectList = new THREE.Object3D();

        if (plane != null) {
            objectList.add(plane);

            var intersects = raycaster.intersectObjects(objectList.children);
            if (intersects[0] != null) {
                var point = intersects[0].point;
                building.move(point.x, point.y);
            } else {
                building.move(mouseVector.x, mouseVector.y);
            }
            scene.add(building.mesh);
        }
    }

    this.detectCameraMovement = function() {
        var pc = Mouse.panCamera();
        if(pc == Mouse.UP || Key.isDown(Key.W)) {
            camera.move('z', 5);
        }
        if(pc == Mouse.DOWN || Key.isDown(Key.S)) {
            camera.move('z', -5);
        }
        if(pc == Mouse.LEFT || Key.isDown(Key.A)) {
            camera.move('x', -5);
        }
        if(pc == Mouse.RIGHT || Key.isDown(Key.D)) {
            camera.move('x', 5);
        }

        if(Key.isDown(Key.Q)) {
            camera.rotate ('y', -0.01);
        }
        if(Key.isDown(Key.E)) {
            camera.rotate ('y', 0.01);
        }

        var sc = Mouse.scrollCamera();
        if(sc == Mouse.OUT) {
            camera.move('y', -1);
        }
        if(sc == Mouse.IN) {
             camera.move('y', 1);
        }
    }
}