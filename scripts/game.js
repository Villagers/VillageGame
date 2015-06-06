var Game = {

    logic: function(){
        if(Mouse._leftButton){
            Structure.construct(Mouse._coords[0], Mouse._coords[1]);
            Mouse._leftButton = false;    
        }
        
    }
};