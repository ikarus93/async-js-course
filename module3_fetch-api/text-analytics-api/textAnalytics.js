'use strict';

document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze(event) {
  const input = document.getElementById("input").value;
  let header = new Headers();
  header.append(
    "Ocp-Apim-Subscription-Key",
    "66aa79bb7b8143568a82c1863c60defa"
  );
  header.append('Content-Type', 'application/json')
  const initObject = {
    method: "POST",
    headers: header,
    mode: "cors",
    body: JSON.stringify({
      documents: [
        {
          id: "1",
          language: "en",
          text: input
        }
      ]
    })
  };
  const url =
    "https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases";
  const request = new Request(url, initObject);
  fetch(request)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(data => {
    data.documents[0].keyPhrases.forEach(appendToDOM);
    
  })
    .catch(err => {
      console.log(err);
    });
}

function appendToDOM(word) {
  const output = document.getElementById('output');
  output.innerText += `${word}, `
}