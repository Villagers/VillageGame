// Construction Menu

var LUMBERMILL = "lumbermill", TOWNHALL = "townhall";

function ConstructionMenu(){

    this.items = [];

    this.addItem = function(item){
        // Add to UI
        var div = document.createElement("div");
        div.id = "menuConstruction_" + item;
        div.innerHTML = '<img src="../../resources/images/menu/' + item + '.jpg">';
        document.getElementById('constructionMenu').appendChild(div);

        // Add to Game
        this.items.push(item);
    }

    this.removeItem = function(item){
        // Remove from UI
        var div = document.getElementById("menuConstruction_" + item);
        div.parentNode.removeChild(div);

        // Remove from Game
        for(i = 0; i < this.items.length; i++){
            if(this.items[i] == item){
                this.items.splice(i, 1);
                break;
            }
        }
    }
}