// Elements
const items = document.querySelectorAll('.item');
const dropzone = document.querySelector('.dropzone');

// make draggable true dynamically | draggable="true"
items.forEach(el=>el.draggable = true);

// Functions
function onDragStart(e) {
    // for draggin into new parent we need dataTransfer & setData
    e.dataTransfer.setData('text/plain', e.target.id);

    // style while draggin
    e.currentTarget.style.borderColor = 'teal';
}

function onDragOver(e) {
    e.preventDefault();
}

function onDrop(e) {
    //get the data that we set
    const id = e.dataTransfer.getData('text');

    // select the draggable el
    const draggableEl = document.getElementById(id);
    draggableEl.style.borderColor = 'salmon';
    //draggableEl.style.margin = '0.5rem' ;

    // appen our draggableEl to the zone
    this.appendChild(draggableEl);

    // reset dataTransfer obj
    e.dataTransfer.clear();
}


// Events
items.forEach(item => item.addEventListener('dragstart', onDragStart));
dropzone.addEventListener('dragover', onDragOver);
dropzone.addEventListener('drop', onDrop);