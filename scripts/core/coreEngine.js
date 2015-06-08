function CoreEngine () {
    var _this = this;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.terrain = new Terrain();
    this.camera = new THREE.Object3D();

    this.buildings;

    this.setCamera = function(fov, ratio) {
        this.camera = new Camera(fov, ratio);
        this.camera.useBuildCamera();
        this.camera.controls.addEventListener( 'change', _this.render );
    }

    this.setRenderer = function(width, height) {
        this.renderer.setSize(width, height);
    }

    this.appendCanvasTo = function(element) {
        element.appendChild(this.renderer.domElement);
    }

    function render() {
        _this.renderer.render(_this.terrain.scene, _this.camera.view);
    }

    this.render = function() {
        render();
    }

    this.placeStructure = function(structure) {
        this.terrain.placeStructure(this.camera.view, structure);
    }

    this.detectCameraMovement = function() {
        this.camera.controls.update();
    }
}