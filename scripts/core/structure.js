// Structure Object
function Structure(type) {
    
    this.type = type;
    this.geom = new THREE.BoxGeometry( 50, 50, 50 ),
    this.material = new THREE.MeshBasicMaterial({color:0xff0000}),
    this.mesh = new THREE.Mesh( this.geom, this.material );

    this.construct

    this.move = function(x, y, z){
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }
};