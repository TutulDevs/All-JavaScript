const $ = x => document.querySelector(x);
const homepage = $('.homepage');
const banking = $('.banking');
const infoBox = $('.infoBox');
let sumTotal = 1250;


const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/'${String(new Date().getFullYear()).slice(2, 4)}`; // date/month/'year


// Deposit functions
function depositMoney(e) {
    e.preventDefault();

    const value = Number(this.querySelector('input').value);
    $('.sum').textContent = (sumTotal += value);
    const markup = `<li class="dep">
    <p class="pill">Deposit</p>
    <p class="date">${date}</p>
    <p class="amount">${value} €</p>
    </li>`;
    infoBox.insertAdjacentHTML('afterbegin', markup);
    this.reset();
}

$('.depForm').addEventListener('submit', depositMoney);


// withdraw functions
function withdrawMoney(e) {
    e.preventDefault();

    const value = Number(this.querySelector('input').value);
    $('.sum').textContent = (sumTotal -= value);
    const markup = `
    <li class="wit">
    <p class="pill">Withdrawn</p>
    <p class="date">${date}</p>
    <p class="amount"> -${value} €</p>
    </li>`;
    infoBox.insertAdjacentHTML('afterbegin', markup);
    this.reset();
}

$('.witForm').addEventListener('submit', withdrawMoney);




// Login functions a@b.dev
function login (e) {
    e.preventDefault();
    const email = this.querySelector('.email').value;
    const password = this.querySelector('.password').value;

    // IF email & pass matches, hide the home page, show the banking
    if (email === 'a@b.dev' && password === '1234') {
        console.log(email, password);
        homepage.style.display = 'none';
        banking.style.display = 'block';

        this.innerHTML = ` <h2 class="user">John Doe</h2> `;
    }

}
$('.loginForm').addEventListener('submit', login);