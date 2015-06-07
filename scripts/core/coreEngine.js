function CoreEngine () {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.terrain = new Terrain();
    this.camera = new THREE.Object3D();

    this.buildings;

    this.setCamera = function(fov, ratio) {
        this.camera = new Camera(fov, ratio);
        this.camera.useBuildCamera();
    }

    this.setRenderer = function(width, height) {
        this.renderer.setSize(width, height);
    }

    this.appendCanvasTo = function(element) {
        element.appendChild(this.renderer.domElement);
    }

    this.render = function() {
        this.renderer.render(this.terrain.scene, this.camera.view);
    }

    this.placeStructure = function(structure) {
        this.terrain.placeStructure(this.camera.view, structure);
    }

    this.detectCameraMovement = function() {
        var pc = Mouse.panCamera();
        if(pc == Mouse.UP || Key.isDown(Key.W)) {
            this.camera.move('z', 5);
        }
        if(pc == Mouse.DOWN || Key.isDown(Key.S)) {
            this.camera.move('z', -5);
        }
        if(pc == Mouse.LEFT || Key.isDown(Key.A)) {
            this.camera.move('x', -5);
        }
        if(pc == Mouse.RIGHT || Key.isDown(Key.D)) {
            this.camera.move('x', 5);
        }

        if(Key.isDown(Key.Q)) {
            this.camera.rotate ('y', -0.01);
        }
        if(Key.isDown(Key.E)) {
            this.camera.rotate ('y', 0.01);
        }

        var sc = Mouse.scrollCamera();
        if(sc == Mouse.OUT) {
            this.camera.move('y', -1);
        }
        if(sc == Mouse.IN) {
            this.camera.move('y', 1);
        }
    }
}