const flock = [];

let alignSlider, cohesionSlider, separationSlider, sizeSlider;

function setup(){
    createCanvas(1080, 720);

    createDiv("align")
    alignSlider = createSlider(0, 5, 1, 0.1);
    createDiv("cohesion")
    cohesionSlider = createSlider(0, 5, 1, 0.1);
    createDiv("separation")
    separationSlider = createSlider(0, 5, 1, 0.1);
    createDiv("Perception")
    sizeSlider = createSlider(0, 1000, 100, 10);
    for(let i = 0; i < 200; i++){
        flock.push(new Boid());
    }
}

function draw(){
    background(51);
    for(let boid of flock){
        boid.edges();
        boid.flock(flock)
        boid.update();
        boid.show();
    }
    fill(255)
    let alignText = 'align: ' + alignSlider.value();
    let alignSize = textWidth(alignText);
    text(alignText, 10, height-20)
    let cohesionText = 'cohesion: ' + cohesionSlider.value();
    let cohesionSize = textWidth(cohesionText);
    text(cohesionText, 20 + alignSize, height-20)
    let separationText = 'separation: ' + separationSlider.value();
    let separationSize = textWidth(separationText);
    text(separationText, 30 + alignSize + cohesionSize, height-20)
    let sizeText = 'Perception: ' + sizeSlider.value();
    text(sizeText, 40 + alignSize + cohesionSize + separationSize, height-20);
}