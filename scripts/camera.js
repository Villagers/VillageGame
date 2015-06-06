var Camera = {
    movement: function() {
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
    },
};