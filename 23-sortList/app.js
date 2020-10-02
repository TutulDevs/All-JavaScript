// table data
var tableData = [
    { name: 'Michael', age: '30', birthdate: '11/10/1989' },
    { name: 'Mila', age: '32', birthdate: '10/1/1989' },
    { name: 'Paul', age: '29', birthdate: '10/14/1990' },
    { name: 'Dennis', age: '25', birthdate: '11/29/1993' },
    { name: 'Tim', age: '27', birthdate: '3/12/1991' },
    { name: 'Erik', age: '24', birthdate: '10/31/1995' },
];

// set the table data
function buildTable(data) {
    const tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = tableData
        .map((person) => {
            return `
            <tr>
                <td>${person.name}</td>
                <td>${person.age}</td>
                <td>${person.birthdate}</td>
            </tr>
        `;
        })
        .join('');
}

// deploy the table
buildTable(tableData);

const th = document.querySelectorAll('th');
th.forEach((el) => el.addEventListener('click', sortTable));

// in DOM desc = descending
function sortTable() {
    const col = this.dataset.colname;
    const order = this.dataset.order;
    const nameCapi = col.charAt(0).toUpperCase() + col.slice(1);

    if (order == 'desc') {
        this.dataset.order = 'asc';
        this.innerHTML = `${nameCapi}  &#9660`;
        tableData = tableData.sort((a, b) => (a[col] > b[col] ? 1 : -1));
    } else {
        this.dataset.order = 'desc';
        this.innerHTML = `${nameCapi}  &#9650`;
        tableData = tableData.sort((a, b) => (a[col] < b[col] ? 1 : -1));
    }

    buildTable(tableData);
}
