// Necessitarem dos objectes de tipus p5.PImage, un per la imatge original 
// i un altre per la imatge filtrada 
let img; 
let imgFilt; 
let imgFilt2;

// Màscara de convolució (Realçament de contorns) expressada com a matriu 
let matrixDetectar = [ [ -1, -1, -1 ], 
               [ -1, 9, -1 ], 
               [ -1, -1, -1 ] ]; 

// Dimensió de la màscara de convolució 
let matrixsizeDetectar = 3; 

// Correcció desplaçament 
let offsetDetectar = 10;

// Màscara de convolució (Detecció de contorns) expressada com a matriu 
let matrix = [ [ -1, -1, -1 ], 
                   [ -1, 8, -1 ], 
                   [ -1, -1, -1 ] ]; 

// Dimensió de la màscara de convolució 
let matrixsize = 3; // 

// Correcció desplaçament
let offset = 128;

function preload() { 
 // Carreguem la imatge original a la variable 
 img = loadImage('imatge_projecte_2.webp'); 
} 

function setup() { 
 // Creem un canvas suficientment gran per pintar les dues imatges 
 createCanvas(2*img.width, img.height); 

 // pixelDensity(1) per no escalar la densitat de píxels a la densitat de píxels del monitor 
 pixelDensity(1); 

 // Creem una nova imatge 'buida' amb les mateixes dimensions que la imatge original 
 imgFilt = createImage(img.width, img.height);
 imgFilt2 = createImage(img.width, img.height);
} 

function draw() { 
 // Pintem la imatge original al canvas a la posició (0, 0) 
 image(img, 0, 0, 600, 600); 

// Sempre hem de cridar loadPixels() abans d'accedir a l'array de píxels 
 img.loadPixels(); 
 imgFilt.loadPixels(); 
 imgFilt2.loadPixels();

// Recorrem tots els píxels de la imatge 
 for (let y=0; y<img.height; y++) { 
  for (let x=0; x<img.width; x++) { 
    // Càlcul de la convolució espacial del píxel (x,y) 
    let c = convolution(x, y, matrix, matrixsize, offset); 

    // Generem un nou píxel a la imatge filtrada 
    let position = (x + y * img.width) * 4; 
    imgFilt.pixels[position] = c; 
    // En ser una imatge en escala de grisos R=G=B 
    imgFilt.pixels[position+2] = imgFilt.pixels[position+1] = imgFilt.pixels[position]; 
    // Per defecte, el canal alfa d'una imatge creada amb createImage() és 0. L'hem de canviar a 255. 
    imgFilt.pixels[position+3] = 255; 
  } 
} 

// Si modifiquem els valors de l'array de píxels, sempre hem d'actualitzar els seus valors 
imgFilt.updatePixels(); 

// Pintem la imatge filtrada a la posició (imgFilt.width, 0) 
// image(imgFilt, imgFilt.width, 0); 

// Només volem que s'executi el codi de draw() una vegada 
noLoop(); 
} 

// Funció que calcula la convolució espacial 
function convolution(x, y, matrix, matrixsize, offset) { 
 let result = 0.0; 
 const half = Math.floor(matrixsize / 2); 

 // Recorrem la matriu de convolució 
 for (let i = 0; i < matrixsize; i++) { 
  for (let j = 0; j < matrixsize; j++) { 
   // Càlcul del píxel sobre el que estem treballant 
   const xloc = x + i - half; 
   const yloc = y + j - half; 
   let loc = (xloc + img.width * yloc) * 4; 

  // Ens assegurem que agafem un píxel dintre del rang vàlid 
  loc = constrain(loc, 0, img.pixels.length-1); 

  // Càlcul de l'operació convolució 
  // Com és una iamtge en escala de grisos, només consultem el valor del canal red (r) 
  result += (img.pixels[loc] * matrix[i][j]); 
 } 
} 


 // Apliquem el desplaçament 
 result += offset; 

 // Ens assegurem que el nivell de gris està en el rang (0, 255) 
 result = constrain(result, 0, 255); 

// Retornem el nivell de gris 
return result; 
}

function keyPressed() {
    if (key === "G" || key === "g") {
        applyFilter(matrixDetectar, matrixsizeDetectar, offsetDetectar);
    } else if (key === "E" || key === "e") {
        applyFilter(matrix, matrixsize, offset);
    }
}

function keyReleased() {
    if (key === "G" || key === "g" || key === "E" || key === "e") {
        image(img, 0, 0, 600, 600);
        image(img, img.width -200, 0, 600, 600); 
    }
}

function applyFilter(matrix, matrixsize, offset) {
    img.loadPixels();
    imgFilt.loadPixels();
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let c = convolution(x, y, matrix, matrixsize, offset);
            let position = (x + y * img.width) * 4;
            imgFilt.pixels[position] = c;
            imgFilt.pixels[position + 1] = c;
            imgFilt.pixels[position + 2] = c;
            imgFilt.pixels[position + 3] = 255;
        }
    }
    imgFilt.updatePixels();
    image(imgFilt, 0, 0, 600, 600);
    image(imgFilt, img.width - 200, 0, 600, 600);
}