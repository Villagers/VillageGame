// Camera Object
function Camera(fov, ratio) {
    var _this = this;

    this.view = new THREE.PerspectiveCamera(fov, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.controls = generateControls();

    function generateControls() {
        var controls = new THREE.OrbitControls( _this.view );
        controls.damping = 0.2;
        return controls;
    }

    this.useBuildCamera = function() {
        this.view.position.y = 150;
        //this.view.rotation.x = 150 * (Math.PI/180);
    }

    this.move = function(axis, delta) {
        if (axis == 'x') {
            this.view.position.x += delta;
        } else if (axis == 'y') {
            this.view.position.y += delta;
        } else if (axis == 'z') {
            this.view.position.z += delta;
        }
    }

    this.rotate = function(axis, delta) {
        this.view.matrix.identity();
        if (axis == 'x') {
            this.view.rotation.x += delta;
        } else if (axis == 'y') {
            this.view.rotation.y += delta;
        } else if (axis == 'z') {
            this.view.rotation.z += delta;
        }
    }
};