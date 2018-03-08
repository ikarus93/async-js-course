let t = 0.00
let id;
let running = false;

function update(t) {
  document.getElementById('output').innerText = t.toFixed(2);
}

function startOrStop() {
  if (!running) {
    running = true;
    return setInterval(() => {
      t += 0.01
      update(t)
    }, 100)
  } else {
    clearInterval(id);
    running = false;
    return 0;
  }
}

function reset() {
  clearInterval(id);
  t = 0.00
  update(t);
  running = false;
  const node = document.getElementById('past');
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function record(t) {
  let parentNode = document.getElementById('past');
  let li = document.createElement('li');
  li.innerText = "-" + t.toFixed(2);
  parentNode.appendChild(li)
}

const s = document.getElementById('start');
const r = document.getElementById('reset');
const rec = document.getElementById('record')
s.addEventListener('click', function() {
  id = startOrStop();
})

r.addEventListener('click', function() {
  reset();
})

rec.addEventListener('click', function() {
  record(t);
})

window.onkeyup = e => {
  const key = e.keyCode ? e.keyCode : e.which;
  if (key === 115) {
    id = startOrStop();
  } else if (key === 116) {
    record(t);
  } else if (key === 114) {
    reset();
  }
}
