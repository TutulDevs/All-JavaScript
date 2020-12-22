const tableBody = document.querySelector('.tbody');
const serial = document.querySelector('[data-col]');
let items = [];

fetch('00-assets/projectList.json')
.then((response) => response.json())
.then((data) => {
    items.push(...data);
    populateUI(tableBody, items);
});

function populateUI(list, arr = []) {
    list.innerHTML = arr.map((el) => {
        return `<tr>
        <td>${
        el.index < 10 ? '0' + el.index: el.index
        }</td>
        <td>
        <a href="${el.urlLive}"
        target="_blank" >

        ${el.name}

        </a>
        </td>
        <td>
        <a href="${el.urlCode}"
        target="_blank" >

        ${el.codeBase}

        </a>
        </td>
        <td> ${el.notes}</td>
        </tr>
        `;
    })
    .join('');
}

function sortSerial() {
    const col = this.dataset.col;
    const order = this.dataset.order;

    if (order == 'desc') {
        this.dataset.order = 'asc';
        items = items.sort((a, b) => (a[col] > b[col] ? 1: -1));
    } else {
        this.dataset.order = 'desc';
        items = items.sort((a, b) => (a[col] < b[col] ? 1: -1));
    }

    populateUI(tableBody, items);
}

serial.addEventListener('click', sortSerial);