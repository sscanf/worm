var maxSize = 100
var chainSize = 40
var chains = new Array(maxSize);
var snikeSize = 0;
var component
var z=999


function newGame(initialLenght) {
    createHead();
    for (var n=0;n<initialLenght;n++) {
        newChain();
    }
}

function createHead(){
    createChain ("head",50,50,1.3);
}

function newChain() {
    if (component == null)
        component = Qt.createComponent("Chain.qml");

    var x,y;
    var headChain = chains[snikeSize-1];
    x =  headChain.x;
    y =  headChain.y;
    createChain ("stone",x,y,1);
    return true;
}


function getHeadPosition() {
    var headChain = chains[0];
    var point = Qt.point(0,0);
    point.x = headChain.x;
    point.y = headChain.y;
    return point;
}


function createChain(sprite,x,y, scale) {
    if (component == null)
        component = Qt.createComponent("Chain.qml");

    if (component.status === Component.Ready) {
        var dynamicObject = component.createObject(background,{"x":x,"y":y});
        if (dynamicObject === null) {
            console.log("error creating chain");
            console.log(component.errorString());
            return false;
        }
        dynamicObject.width  =  chainSize;
        dynamicObject.height = chainSize;
        dynamicObject.sprite = sprite;
        dynamicObject.scale  = scale;
        dynamicObject.z      = z--;
        chains[snikeSize++]  = dynamicObject;
    } else {
        console.log("error loading block component");
        console.log(component.errorString());
        return false;
    }
    return true;
}

function moveSnike (x, y, mouseX, mouseY) {
    var headChain = chains[0];
    headChain.x+=x*(chainSize-15);
    headChain.y+=y*(chainSize-15);

    var ang = -180*Math.atan2 (headChain.x-mouseX, headChain.y-mouseY)/Math.PI;
    headChain.rotation = ang;

    for (var n=0;n<snikeSize-1;n++) {
        var chain = chains[n];
        var nextChain = chains[n+1];
        nextChain.x = chain.x;
        nextChain.y = chain.y;
    }
}
