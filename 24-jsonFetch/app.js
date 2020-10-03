const tableBody = document.querySelector('.tbody');
let items = [];

fetch('projects.json')
    .then((response) => response.json())
    .then((data) => {
        items.push(...data);
        populateUI(items, tableBody);
    });

function populateUI(arr = [], list) {
    list.innerHTML = arr
        .map((el, i) => {
            return `
            <tr>
                <td>${i < 10 ? '0' + i : i}</td>
                <td>
                    <a
                        href="${el.urlLive}"
                        target="_blank"
                        >${el.name}</a
                    >
                </td>
                <td>
                    <a
                        href="${el.urlCode}"
                        target="_blank"
                        >${el.codeBase}</a
                    >
                </td>
                <td>${el.notes}</td>
            </tr>
        `;
        })
        .join('');
}
