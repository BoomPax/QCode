//yes im using p5 while teaching it at the same time
//no i dont want to know how this can be done better

let darkMode = false;
let camera = new Camera(0,0);
let lessons = [];
let lessonsIndex = [];

function setup(){
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const navHeight = styles.getPropertyValue("--navbar-height").replace("px","");
    let height = window.innerHeight - navHeight;
    createCanvas(window.innerWidth,height).parent("#canvas-parent");
    setupColors();
    loadLessons();
}

function draw(){
    camera.move();
    camera.apply();
    drawBackground();
    drawLessons();
}

function drawLessons(){
    for(let lesson of lessons){
        lesson.update();
    }
}

function drawBackground(){
    let spacing = 30;
    background(currentColors.background)
    let w= width/2*camera.zoom;
    let h= height/2*camera.zoom;
    for(let i=-w;i<w;i+=spacing){
        for(let j=-h;j<h;j+=spacing){
            noStroke();
            fill(127);
            let x = i-floor(camera.x/spacing)*spacing;
            let y = j-floor(camera.y/spacing)*spacing;
            ellipse(x,y,3,3);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}