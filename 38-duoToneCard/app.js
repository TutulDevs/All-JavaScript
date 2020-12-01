const $ = s => document.querySelector(s);


function gimme () {
    const hex1 = '#' + Math.random().toString(15).substr(-6);
    const hex2 = '#' + Math.random().toString(15).substr(-6);

    // colors
    $('.boxLeft').style.background = hex1;
    $('.boxLeft').style.color = hex2;
    $('.btnLeft').style.background = hex2;
    $('.btnLeft').style.color = hex1;

    $('.boxRight').style.background = hex2;
    $('.boxRight').style.color = hex1;
    $('.btnRight').style.background = hex1;
    $('.btnRight').style.color = hex2;

    // code snippets
    $('.left').textContent = hex1;
    $('.right').textContent = hex2;
}

gimme();

$('.btn').addEventListener('click', gimme);