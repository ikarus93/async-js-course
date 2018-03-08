//Variables
let last = 0;
let timerId;
let timePassed = 0;
const nodeList = Array.prototype.slice.call(document.getElementsByTagName('td'));


function shuffle(canvas) {
  //shuffles array of numbers
  let copy = canvas.slice();
  let used = [];
  canvas.forEach(item => {
    let index = 0;
    while (used.indexOf(index) !== -1) {
      index = Math.floor(Math.random() * canvas.length);
    }
    copy[index] = item;
    used.push(index)
  })
  return copy;
}

function openField(e) {
  //opens the playing field and determines if field and last opened field match
  field = e.target
  if (last !== field && !field.classList.contains('matched')) {
    field.classList.add('open');
    if (last) {
      if (last.innerText == field.innerText) {
        last.classList.add('matched');
        field.classList.add('matched');
        last.removeEventListener('click', openField);
        field.removeEventListener('click', openField);
        last = 0;
      } else {
        setTimeout(function() {
          field.classList.remove('open')
          last.classList.remove('open')
          last = 0;
        }, 500)
      }

    } else {
      last = field;
    }
  }
}

function setTimer(t) {
  //updates Timer DOM Element
  let node = document.getElementById('timer');
  node.innerText = `Time passed: ${t}`
}


function setUp() {
  //Sets up the playing field and ties event handlers to each field
  let canvas = shuffle([1, 1, 2, 2, 3, 3, 4, 4, 5]);
  nodeList.forEach((td, i) => {
    td.innerText = canvas[i];
    td.addEventListener('click', openField)
    td.addEventListener('click', startInterval)
  })
  addBodyEventListener();
}

function startInterval() {
  if (!timerId) {
    timerId = setInterval(() => {
      timePassed++;
      setTimer(timePassed)
    }, 1000)
  }
}

document.getElementById('restart').addEventListener('click', () => {
  //Event handler for restart button
  last = 0;
  nodeList.forEach(td => {
    td.classList.remove('open');
    td.classList.remove('matched')
  })
  clearInterval(timerId)
  timePassed = 0;
  setTimer(timePassed)
  timerId = undefined;
  setUp();
})


setUp(); //builds DOM
