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
 // Creem un canvas suficientment gran per pintar dues imatges 
 createCanvas((resizeValue+1)*img.width, (resizeValue+1)*img.height); 
 // Assignem el valor de rotació 
 rotateValue = 0; 
 // pixelDensity(1) per no escalar la densitat de píxels a la densitat de píxels del monitor 
 pixelDensity(1); 
} 
function mousePressed() {
    console.log("mousePressed");
    rotateValue = random(0, 360);
    coorX = random(0, width/2); 
    coorY = random(0, height/2);
    resizeValue = random(0.5, 2); 
    clear();
    redraw();
}

function draw() { 
    
    // Pintem la imatge ampliada a la posició (img.width/resizeValue, 0) 
    translate(coorX, coorY);
    rotate(rotateValue);
    img.resize(resizeValue * img.width, resizeValue * img.height);
    image(img, 0, 0); 
    noLoop();
}