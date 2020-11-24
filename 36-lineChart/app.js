const form = document.querySelector('.form');
const charts = document.querySelector('.charts');

// HEX colors Random
const randomHex = () => Math.random().toString(16).substr(-6);



function createChart(e) {
    e.preventDefault();

    // values
    const name = this.querySelector('.name').value;
    const value = this.querySelector('.val').value;
    const markup =
    `<div class="chart" style="height:${value}%;background:#${randomHex()};">
    <div class="chart-snippet">
    <span>${name}</span>
    <span>${value}</span>
    </div>
    </div>`

    // show in the UI
    charts.insertAdjacentHTML('beforeend', markup);
}

// Event
form.addEventListener('submit', createChart);