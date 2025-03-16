let img;

// Coordenades del nou origen 
let coorX = 100; 
let coorY = 100; 
// Per valors > 1 apliquem una ampliació, valors < 1 una reducció 
let resizeValue = 1; 

// Valor de la rotació 
let rotateValue; 

function preload() { 
    // Carreguem la imatge original a la variable 
    img = loadImage('imatge_projecte_2.webp'); 
} 

function setup() { 
    // Esperem que la imatge es carregui abans de continuar
    img.loadPixels();
    // Creem un canvas suficientment gran per pintar la imatge
    createCanvas(windowWidth, windowHeight); 
    // Assignem el valor de rotació 
    rotateValue = 0; 
    // pixelDensity(1) per no escalar la densitat de píxels a la densitat de píxels del monitor 
    pixelDensity(1); 
} 

function mousePressed() {
    console.log("mousePressed");
    rotateValue = random(0, 360);
    resizeValue = random(0.5, 2); 
    clear();
    redraw();
}

function draw() { 
    clear();
    // Ajustem la mida de la imatge per assegurar-nos que sempre es vegi completa
    let newWidth = resizeValue * img.width;
    let newHeight = resizeValue * img.height;
    let aspectRatio = img.width / img.height;

    if (newWidth > width) {
        newWidth = width;
        newHeight = newWidth / aspectRatio;
    }
    if (newHeight > height) {
        newHeight = height;
        newWidth = newHeight * aspectRatio;
    }

    // Centrem la imatge al canvas
    coorX = (width - newWidth) / 2;
    coorY = (height - newHeight) / 2;

    translate(coorX + newWidth / 2, coorY + newHeight / 2);
    rotate(rotateValue);
    imageMode(CENTER);
    image(img, 0, 0, newWidth, newHeight); 
    noLoop();
}