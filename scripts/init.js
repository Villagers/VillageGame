var core = new CoreEngine();
var gameLogic = new Game();

function initSetup() {
    core.setCamera(75, window.innerWidth/window.innerHeight);
    core.setRenderer(window.innerWidth, window.innerHeight);
    core.appendCanvasTo(document.getElementById('gameDiv'));

    //Render
    core.render();

    // Resource Handler
    var resource = new Resource();
    setInterval(function(){resource.autoUpdate();}, 1000);
    // Menu Handler
    var menu = new Menu();
    menu.addItem(CONSTRUCTION, LUMBERMILL);
    menu.addItem(CONSTRUCTION, TOWNHALL);
        menu.addItem(CONSTRUCTION, LUMBERMILL);
    menu.addItem(CONSTRUCTION, TOWNHALL);
        menu.addItem(CONSTRUCTION, LUMBERMILL);
    menu.addItem(CONSTRUCTION, TOWNHALL);
        menu.addItem(CONSTRUCTION, LUMBERMILL);
    menu.addItem(CONSTRUCTION, TOWNHALL);
        menu.addItem(CONSTRUCTION, LUMBERMILL);
    menu.addItem(CONSTRUCTION, TOWNHALL);
        menu.addItem(CONSTRUCTION, LUMBERMILL);
    menu.addItem(CONSTRUCTION, TOWNHALL);
    menu.removeItem(CONSTRUCTION, LUMBERMILL);

    console.log(menu.construction.items);

    // Initiate Loop
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