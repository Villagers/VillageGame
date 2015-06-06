var Structure = {
    buildings: null,

    init: function(){
        buildings = new THREE.Object3D();
    },

    generate: function(){
        geom = new THREE.BoxGeometry( 50, 50, 50 ),
        mat = new THREE.MeshBasicMaterial({color:0xff0000}),
        cube = new THREE.Mesh( geom, mat ),
        cube.position.x -= 200,
        buildings.add( cube );
        var mat = new THREE.MeshBasicMaterial({color:0xff0000});
        var cube = new THREE.Mesh( geom, mat );
        cube.position.x += 200;
        buildings.add( cube );
        scene.add(buildings);
    },

    movement: function(){
        var raycaster = new THREE.Raycaster();
        var mouseVector = new THREE.Vector2();
        var offset = new THREE.Vector3();
        
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
    },
};