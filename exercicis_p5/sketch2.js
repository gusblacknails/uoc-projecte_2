let img;

let tamanyOriginal = true;
function preload() {
  img = loadImage("imatge_projecte_2.webp");
}
function setup() {
  createCanvas(1000, 1000);
  background(50);
  image(img, 0, 0);
}
function dilatacioImatge() {
  // if (tamanyOriginal) {
  //   console.log("1");
  //   image(img, 0, 0, 1500, 1500);
  //   tamanyOriginal = false;
  // }
  // else {
  //   console.log("2");
  //   image(img, 2, 2);
    
  //   tamanyOriginal = true;
  // }  
  img.filter(DILATE);
  image(img, 0, 0);
  
}
function posteritzacio() {
  img.filter(POSTERIZE, 3);
  image(img, 0, 0);
}
function binaritzacio() {
  img.filter(THRESHOLD);
  image(img, 0, 0);
}
function negatiu() {
  img.filter(INVERT);
  image(img, 0, 0);
}
function resetejar() {
  
  img = loadImage("imatge_projecte_2.webp", () => {
    createCanvas(1000, 1000);
    background(50);
    image(img, 0, 0);
     // pixelDensity(1) per no escalar la densitat de píxels a la densitat de píxels del monitor 
    // pixelDensity(1); 
  });
  
}
function keyPressed() {
  if (key === "E" || key === "e") {
    dilatacioImatge();
  }
  if (key === "S" || key === "s") {
    posteritzacio();
  }
  if (key === "C" || key === "c") {
    binaritzacio();
  }
  if (key === "O" || key === "o") {
    negatiu();
  }

  if (key != "E" && key != "e" && key != "S" && key != "s" && key != "C" && key != "c" && key != "O" && key != "o") {
    resetejar();
  }

}
