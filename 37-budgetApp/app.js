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
function headerUI(inc, exp) {
    // Calculations
    const totalInc = inc.reduce((a, c)=> a + c.value, 0).toFixed(2);
    const totalExp = exp.reduce((a, c)=> a + c.value, 0).toFixed(2);
    const sumTotal = (totalInc - totalExp).toFixed(2);
    const perc = Math.round((totalExp * 100) / totalInc);

    if (inc.length > 0 || exp.length > 0) {
        // UI
        incTotal.textContent = '+ ' + totalInc;
        expTotal.textContent = '- ' + totalExp;
        percentage.textContent = perc + '%';
        sum.textContent = '$ ' + sumTotal;

        // hide kill switch
        $('.kill').style.display = 'block';
    } else if (inc.length === 0 || exp.length === 0) {
        // UI for Header part
        incTotal.textContent = '+ 0.00';
        expTotal.textContent = '- 0.00';
        percentage.textContent = '__%';
        sum.textContent = '$ 0.00';

        // hide kill switch
        $('.kill').style.display = 'none';
    }
}

function killData () {
    // Remove all items from the arrays
    [incArr,
        expArr].forEach(el => el.splice(0, el.length));

    // store in storage & display
    localStorage.setItem('incArr', JSON.stringify(incArr));
    localStorage.setItem('expArr', JSON.stringify(expArr));


    headerUI(incArr, expArr);
    addInBoxes(incomeBoxes, incArr);
    addInBoxes(expenseBoxes, expArr);
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

        headerUI(incArr, expArr);
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
    headerUI(incArr, expArr);

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
$('.kill').addEventListener('click', killData);


// Show what we've on page load
headerUI(incArr, expArr);
addInBoxes(incomeBoxes, incArr);
addInBoxes(expenseBoxes, expArr);



// ... Date settings
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const now = new Date();

$('.date').textContent = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();