// Async
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
async function getInfo() {
    try {
        const res = await fetch(endpoint);
        let data = await res.json();
        data = await data.splice(0, 100);
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Display table
function tableData(container, arr) {
    container.innerHTML = arr.map((el, i) => {
        return `<tr>
        <th scope="row">${arr[i].rank}</th>
        <td>${arr[i].city}</td>
        <td>${arr[i].state}</td>
        <td>${arr[i].population}</td>
        </tr>`;
    }).join('');
}

// ELements
const $ = x => document.querySelector(x);
const select = $('.select');
const tbody = $('.tbody');
const pagiList = $('.pagination');

const numFormat = new Intl.NumberFormat('en-US');
let itemsArr = [];
let perPage = 10;

async function showTime() {
    let m = await getInfo();

    for (let i = 0; i < m.length; i++) {
        let obj = {
            rank: m[i].rank,
            city: m[i].city,
            state: m[i].state,
            population: numFormat.format(m[i].population)
        };
        itemsArr.push(obj);
    }

    let totalPages = Math.ceil(m.length / perPage);

    // show btns
    for (let i = 0; i < totalPages; i++) {
        let markup = `<li class="page-item mb-1"><a class="page-link text-dark pagi-btn" href="#" data-id="${i + 1}">${i+1}</a></li>`;
        pagiList.insertAdjacentHTML('beforeend', markup);
    }

    // for displaying at first
    function paginate(arr, perPage, pageNumber = 1) {
        perPage = perPage;
        const start = perPage * (pageNumber - 1);
        let nr = arr.slice(start, (start + perPage));
        tableData(tbody, nr);
    }
    paginate(itemsArr, perPage);

    const btns = [...document.querySelectorAll('.pagi-btn')];
    btns[0].style.background = '#48CAE4';

    btns.forEach(el => el.addEventListener('click', function() {
        btns.forEach(el => el.style.background = 'transparent');
        this.style.background = '#48CAE4';

        pageNumber = Number(this.dataset.id);
        paginate(itemsArr, perPage, pageNumber);
    }));

}



// load on first
showTime();




////////        Pagination Fnction
/*

select.addEventListener('change', function(){
    perPage = Number(this.value) ;
});

let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
function paginateArray(ary, perPage = 10, pageNumber = 1) {
    const start = perPage * (pageNumber - 1);
    return ary.slice(start, (start + perPage));
}
*/