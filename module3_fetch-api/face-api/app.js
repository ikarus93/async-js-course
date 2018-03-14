const input = document.getElementById("input");
const button = document.getElementById("analyse");
button.addEventListener("click", analyze);
const imageDiv = document.getElementById("image");
const p = document.getElementById("p");
const output = document.getElementById("output");
const abs = "";
function analyze() {
  clearDOM();
  
  const img = document.createElement("img");
  img.setAttribute("src", input.value);
  try {
    imageDiv.removeChild(p);
  } catch(e) {}
  
  imageDiv.appendChild(img);

  const url =
    "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender";

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "Ocp-Apim-Subscription-Key",
    "APIKEY"
  );

  const initObject = {
    method: "POST",
    headers: headers,
    mode: "cors",
    body: JSON.stringify({
      url: input.value
    })
  };

  const request = new Request(url, initObject);
  fetch(request)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(data => {
      appendToDOM(data[0].faceAttributes);
    })
    .catch(err => {
      appendToDOM(null);
    });
}

function appendToDOM(val) {
  if (val) {
    for (let key in val) {
      let attr = document.createElement("p");
      attr.innerText = `${key}: ${val[key]}`;
      output.appendChild(attr);
    }
  } else {
    let child = document.createElement("p");
    child.innerText = "Image does not contain a face";
    output.appendChild(child);
  }
}

function clearDOM() {
  try {
    let allParagraphs = output.querySelectorAll('p');
    let img = imageDiv.querySelectorAll('img')[0];
    imageDiv.removeChild(img);
    allParagraphs.forEach(p => {
      output.removeChild(p);
    })
    
  } catch (e)  {
    console.log(e)
  }
}