var GOLD = "gold", WOOD = "wood", FOOD = "food", STONE = "stone";
var POPCAP = "populationCap", POPCURR = "populationCurrent";

// setInterval(function(){resource.autoUpdate();}, 1000);

function Resource(){
    this.gold = this.wood = this.food = this.stone = 0;
    this.populationCap = this.populationCurrent = 0;
    this.goldPerSec = this.woodPerSec = this.foodPerSec = this.stonePerSec = 0;

    this.set = function(type, value){
        if(type == GOLD)    this.gold = value;
        if(type == WOOD)    this.wood = value;
        if(type == FOOD)    this.food = value;
        if(type == STONE)   this.stone = value;
        if(type == POPCAP)  this.populationCap = value;
        if(type == POPCURR) this.populationCurrent = value;
    }

    this.setRate = function(type, rate){
        if(type == GOLD)        this.goldPerSec = rate;
        else if(type == WOOD)   this.woodPerSec = rate;
        else if(type == FOOD)   this.foodPerSec = rate;
        else if(type == STONE)  this.stonePerSec = rate;
    }

    this.incRate = function(type, delta){
        delta = Math.abs(delta);
        if(type == GOLD)        this.goldPerSec += delta;
        else if(type == WOOD)   this.woodPerSec += delta;
        else if(type == FOOD)   this.foodPerSec += delta;
        else if(type == STONE)  this.stonePerSec += delta;
    }

    this.decRate = function(type, delta){
        delta = Math.abs(delta);
        if(type == GOLD)        this.goldPerSec -= delta;
        else if(type == WOOD)   this.woodPerSec -= delta;
        else if(type == FOOD)   this.foodPerSec -= delta;
        else if(type == STONE)  this.stonePerSec -= delta;
    }

    this.incrementCurrentPopulation = function(){
        this.populationCurrent += 1;
    }

    this.decrementCurrentPopulation = function(){
        this.populationCurrent -= 1;
    }

    this.incrementPopulationCap = function(delta){
        delta = Math.abs(delta);
        this.populationCap += delta;
    }

    this.decrementPopulationCap = function(delta){
        delta = Math.abs(delta);
        this.populationCap -= delta;
    }

    this.autoUpdate = function(){
        this.gold += this.goldPerSec;
        this.wood += this.woodPerSec;
        this.food += this.foodPerSec;
        this.stone += this.stonePerSec;
        console.log("Gold: " + this.gold + " Wood: " + this.wood + " Food: " + this.food + " Stone: " + this.stone);
        console.log("Population: " + this.populationCurrent + "/" + this.populationCap);
    }
}
