var core = new CoreEngine();
var gameLogic = new Game();

function initSetup() {
    core.setCamera(75, window.innerWidth/window.innerHeight);
    core.setRenderer(window.innerWidth, window.innerHeight);
    core.appendCanvasTo(document.getElementById('gameDiv'));

    onKeyFrame();
}

function onKeyFrame(){
    core.render();
    core.detectCameraMovement();
    if(Mouse._leftButton) {
        var building = new Structure();
        core.placeStructure(building);
        Mouse._leftButton = false;
    }
    requestAnimationFrame(onKeyFrame);
};