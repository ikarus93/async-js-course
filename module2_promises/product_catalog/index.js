const search = document.getElementById('input');
const button = document.getElementById('inputButton');
const examinedTxt = document.getElementById('productText');
const similarTabl = document.getElementById('similarTable');
const allTabl = document.getElementById('allTable');

function fillExamined(prod) {
  examinedTxt.innerHTML = `<p id="productText">Product Id: ${prod.id} <br>Price: ${prod.price}<br>Type: ${prod.type}</p>`
}

function fillTable(prods, table) {
  prods.forEach(prod => {
    let tHeads = table.querySelectorAll('th');
    const productKeys = ['id', 'price', 'type']
    for (let i = 0; i < 4; i++) {
      let tr = document.createElement('tr');
      if (i < 3) {
        let td = document.createElement('td');
        let span = document.createElement('span');
        span.innerText = prod[productKeys[i]]
        td.appendChild(span);
        tr.appendChild(td);
      } else {
        let examine = document.createElement('button');
        examine.innerText = 'Examine'
        examine.classList.add('examine');
        examine.value = prod.id;
        addEventToExamine(examine);
        tr.appendChild(examine);
      }

      tHeads[i].appendChild(tr);
    }

  });
}

function getIntersection(arr1, arr2, searchId) {
  let products = [];
  arr1.forEach(p1 => {

    arr2.forEach(p2 => {
      if (p1.id === p2.id && p1.id !== searchId) {
        products.push(p1);
      }
    });
  })
  return products;
}

function retrieveProducts(id) {
  api.searchProductById(parseInt(id)).then(prod => {
    fillExamined(prod);
    return Promise.all([api.searchProductsByPrice(prod.price, 50), api.searchProductsByType(prod.type), prod.id]);
  }).then(val => {
    let prods = getIntersection(val[0], val[1], val[2])
    fillTable(prods, similarTabl);
  }).catch(e => {
    alert(e)
  });
}

function clearTable(table) {
  let tHeads = Array.from(table.querySelectorAll('th'));
  tHeads.forEach(head => {
    head.innerHTML = '';
  });
}

function addEventToExamine(button) {
  button.addEventListener('click', (e) => {
    clearTable(similarTabl);
    retrieveProducts(parseInt(e.target.value))
  })
}

button.addEventListener('click', () => {
  let query = search.value;
  retrieveProducts(parseInt(query));
});


//Start of script
api.searchAllProducts().then(prods => {
  fillTable(prods, allTabl);
}).catch(alert)
