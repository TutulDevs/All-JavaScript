let qs = (selector) => document.querySelector(selector);

// Get the DOM
const form = qs('#form');
const username = qs('#username');
const email = qs('#email');
const password = qs('#password');
const password2 = qs('#password2');
const inputFields = [username, email, password, password2];

// Show Error
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    formControl.querySelector('small').textContent = message;
};

// Show Success
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

// Check Required
const checkRequired = () => {
    inputFields.forEach((input) => {
        if (input.value === '') {
            showError(
                input,
                `${input.previousElementSibling.textContent} is required`
            );
        } else {
            showSuccess(input);
        }
    });
};

// Check Email
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //return re.test(String(email).toLowerCase());
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(
            input,
            `${input.previousElementSibling.textContent} is not valid`
        );
    }
};

// Check Length
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(
            input,
            `${input.previousElementSibling.textContent} shouldn't be less than ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${input.previousElementSibling.textContent} shouldn't be more than ${max} characters`
        );
    } else showSuccess(input);
};

// Match Password
const matchPassword = (a, b) => {
    if (a.value !== b.value) showError(b, `Password didn't match!`);
};

// Form Handler
const formHandler = (e) => {
    e.preventDefault();

    checkRequired(inputFields);
    checkLength(username, 3, 15);
    checkLength(password, 6, 24);
    checkEmail(email);
    matchPassword(password, password2);
};

// Removing Spaces from the values
inputFields.forEach((el) =>
    el.addEventListener('keypress', (event) => {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    })
);

//  Event Invocation
form.addEventListener('submit', formHandler);

/*
    // Capitalization
    // get the first letter, make it upperCase | get the string, remove/ cut the first letter | join both
    const capitalize = (input) =>
        input.id.charAt(0).toUpperCase() + input.id.slice(1);
    

    // for getting the submitted data in the console
    form.addEventListener('submit', e => {
        e.preventDefault()
        const valid = [
            checkRequired(username, email, password, password2),
            checkLength(username, 3, 15),
            checkLength(password, 6, 25),
            checkEmail(email),
            checkPasswordsMatch(password, password2)
        ].every(check => check())
        if (valid) {
            console.log('Register success', {
            username: username.value,
            email: email.value,
            password: password.value
            })
        }
    })

    // spaces
    const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("password2");
        inputFields = [username, email, password, confirmPassword]; 
        
        inputFields.forEach(input =>
        input.addEventListener("keypress", event => {
            if (event.keyCode === 32) {
            event.preventDefault();
            }
        })
    );
    //Also, I added the onpaste="return false" property to each input field in the HTML to prevent pasting any spaces into the fields.  e.g.: <input type="text" id="username" placeholder="Enter username" onpaste="return false"
*/
