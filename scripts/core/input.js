window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
window.addEventListener('wheel', function(event) { Mouse.getDelta(event); }, false);
window.addEventListener('mousedown', function(event) { Mouse.onDown(event); }, false );
window.addEventListener('mouseup', function(event) { Mouse.onUp(event); }, false );
window.addEventListener('mousemove', function(event) { Mouse.getCoords(event); }, false );

var Key = {
    _pressed: {},

    A: 65,
    W: 87,
    D: 68,
    S: 83,
    Q: 81,
    E: 69,
    SPACE: 32,
  
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
  
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },
    
    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

var Mouse = {
    _coords: {},
    _delta: 0,
    _leftButton: false,

    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
    NONE: 4,
    IN: 5,
    OUT: 6,

    getCoords: function(event){
        var x = event.clientX;
        var y = event.clientY;
        this._coords[0] = x;
        this._coords[1] = y;
    },

    onDown: function(event){
        this._leftButton = true;
    },

    onUp: function(event){
        this._leftButton = false;
    },

    getDelta: function(event){
        this._delta = event.wheelDelta;
    },

    panCamera: function(){
        if(this._coords[1] < 10){
            return this.UP;
        }
        if(this._coords[1] >= window.innerHeight - 10){
            return this.DOWN;
        }
        if(this._coords[0] < 10){
            return this.LEFT;
        }
        // console.log(window.innerWidth)
        if(this._coords[0] >= window.innerWidth - 10){
            return this.RIGHT;
        }
        return this.NONE;
    },

    scrollCamera: function(){
        if(this._delta < 0){
            this._delta = 0;
            return this.OUT;
        }
        if(this._delta > 0){
            this._delta = 0;
            return this.IN;
        }
        this._delta = 0;
        return this.NONE;
    }
};