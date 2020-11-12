const form = document.querySelector('form');

//  Get the BMI
function getBMI(e) {
    e.preventDefault();

    const weight = document.querySelector('#weight').value;
    let height = document.querySelector('#height').value;
    const result = document.querySelector('.result');

    const bmi = (weight / height / height) * 10000;

    result.textContent = 'Your BMI is: ' + Math.round(bmi);
}


// Events
form.addEventListener('submit', getBMI);