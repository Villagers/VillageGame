// Super Menu

var CONSTRUCTION = "construction", RESOURCE = "resource";

function Menu(){
    this.construction = new ConstructionMenu();
    this.resource = new ResourceMenu();

    this.addItem = function(menu, item){
        if(menu == CONSTRUCTION) this.construction.addItem(item);
        // if(menu == RESOURCE) this.resource.addItem(item);
    }

    this.removeItem = function(menu, item){
        if(menu == CONSTRUCTION) this.construction.removeItem(item);
    }
}
