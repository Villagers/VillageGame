var core = new CoreEngine();
var gameLogic = new Game();

function initSetup() {
    core.setCamera(75, window.innerWidth/window.innerHeight);
    core.setRenderer(window.innerWidth, window.innerHeight);
    core.appendCanvasTo(document.getElementById('gameDiv'));

    // Resource Handler
    var resource = new Resource();
    setInterval(function(){resource.autoUpdate();}, 1000);

    core.render();
    onKeyFrame();
}

function onKeyFrame(){
    if(Mouse._leftButton) {
        var building = new Structure();
        core.placeStructure(building);
        core.render();
        Mouse._leftButton = false;
    } 
    requestAnimationFrame(onKeyFrame);
    core.detectCameraMovement();
};