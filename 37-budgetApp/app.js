// DOMs
const $ = selector => document.querySelector(selector);
const sum = $('.sum');
const incTotal = $('.inc__total');
const expTotal = $('.exp__total');
const percentage = $('.percentage');
const form = $('.form');
const incomeBoxes = $('.income__boxes');
const expenseBoxes = $('.expense__boxes');


// Arrays
const incArr = JSON.parse(localStorage.getItem('incArr')) || [];
const expArr = JSON.parse(localStorage.getItem('expArr')) || [];



// functions for displaying in boxes
function addInBoxes(boxes, arr = []) {
    boxes.innerHTML = arr.map((el, i) => {
        return `<div class="box" data-type="${el.type}" data-index="${i}">
        <p class="description">${el.desc}</p>
        <p class="value">$ ${el.value}</p>
        <span class="delete" data-type="${el.type}" data-index="${i}">&#10799;</span>
        </div>`
    })
    .join('');
}

// show in the header
function headerUI() {
    if (incArr.length >= 1 || expArr.length >= 1) {
        // Calculations
        const totalInc = incArr.reduce((a, c)=> a + c.value, 0).toFixed(2);
        const totalExp = expArr.reduce((a, c)=> a + c.value, 0).toFixed(2);
        const sumTotal = (totalInc - totalExp).toFixed(2);
        const perc = Math.round((totalExp * 100) / totalInc);

        // UI
        incTotal.textContent = '+ ' + totalInc;
        expTotal.textContent = '- ' + totalExp;
        percentage.textContent = perc + '%';
        sum.textContent = '$ ' + sumTotal;
    }
}

function deleteItem(e) {
    const el = e.target;
    const index = el.dataset.index;
    const type = el.dataset.type;

    if (el.classList.contains('delete')) {
        // IF type is +, delete from incArr
        // IF - , del from expArr
        type === '+' ? incArr.splice(index, 1): expArr.splice(index, 1);

        // store in storage & display
        localStorage.setItem('incArr', JSON.stringify(incArr));
        localStorage.setItem('expArr', JSON.stringify(expArr));

        headerUI();
        addInBoxes(incomeBoxes, incArr);
        addInBoxes(expenseBoxes, expArr);
    }
}

function calculate(e) {
    e.preventDefault();

    // Get values
    const desc = $('.desc').value;
    const value = Number($('.value').value);
    const type = this.querySelector('.type').value;

    // Obj to push
    const vals = {
        desc,
        value,
        type,
    }

    // Push in arrs
    // IF + , income or expense
    type === '+' ? incArr.push(vals): expArr.push(vals);

    // Header
    headerUI();

    // add in BOxes
    addInBoxes(incomeBoxes, incArr);
    addInBoxes(expenseBoxes, expArr);

    // set in localStorage
    localStorage.setItem('incArr', JSON.stringify(incArr));
    localStorage.setItem('expArr', JSON.stringify(expArr));


    // Reset the form
    this.reset();
    $('.desc').focus();
}


// Events
form.addEventListener('submit', calculate);
[incomeBoxes, expenseBoxes].forEach(boxes => boxes.addEventListener('click', deleteItem));


// Show what we've on page load
headerUI();
addInBoxes(incomeBoxes, incArr);
addInBoxes(expenseBoxes, expArr);