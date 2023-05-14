
const ImageLoaderWorker = new Worker('/javascript/workers/image-loader.js');

const imgElements = document.querySelectorAll('img[data-src]')

ImageLoaderWorker.addEventListener('message', event => {
  // Grab the message data from the event
  const imageData = event.data

//   console.log('We got a message back!', imageData)

  const imageElement = document.querySelector(`img[data-src='${imageData.imageURL}']`)

  const objectURL = URL.createObjectURL(imageData.blob)
  
  imageElement.setAttribute('src', objectURL)
  imageElement.removeAttribute('data-src')
})

imgElements.forEach(imageElement => {
  const imageURL = imageElement.getAttribute('data-src')
  ImageLoaderWorker.postMessage(imageURL)
})


// =======================================================

var localCounter = document.getElementById("counter-local");
localCounter.innerText = localStorage.getItem("counter");

function updateCounter(){
  let counter = localStorage.getItem("counter");
  if (counter == null){
    // console.log("creato");
    localStorage.setItem("counter", 1);
  }else{
    counter++;
    // console.log("aggiornato");
    localStorage.setItem('counter', counter);
  }
  // console.log(localStorage.getItem("counter"));
}

function setCounter(){
  let counter = localStorage.getItem("counter");
  if (counter == null){
    // console.log("creato");
    localStorage.setItem("counter", 1);
    localCounter.innerText = localStorage.getItem("counter");
    console.log("gg");
  }
}