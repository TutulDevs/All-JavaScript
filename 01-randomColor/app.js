let qs = selector => document.querySelector(selector);


function getRGB() {
    //  Random number from 0 to 255
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    let rgb =  red + ', ' + green + ', ' + blue;

    return rgb;
};

qs('.rgb-btn').addEventListener('click', () => {
    const rgbColor = `rgb(${getRGB()})`;
    //console.log(rgbColor); 

    qs('.rgb').style.backgroundColor = rgbColor;
    
    // set the value in color name
    qs('.rgb-name').textContent = rgbColor;
});

/////////////////////////////////   HEX

let hexShort = () => Math.random().toString(16).substr(-6);
//console.log(`hexa: ${hexa()}`);

// .toString(16) gives us 15 hex values in Math.random()'s decimal. .substr(-6) returns the characters from the last 0 to 6. 
// Math.random() = 0.843879329
// Math.random().toString(16) = 0.k3i5o67kjda8
// Math.random().toString(16).substr(-6) = 7kjda8

qs('.hex-btn').addEventListener('click', () => {
    let hexColor = `#${hexShort()}`;    
    //console.log(hexColor); 

    qs('.hex').style.backgroundColor = hexColor;
    
    // set the value in color name
    qs('.hex-name').textContent = hexColor;
});

/////////   More Readable way

let characters = 'ABCDEF0123456789';

function getHEX () {
    let result = '';
    let charLength = characters.length; // 16

    let p = Math.floor(Math.random() * charLength);
    //console.log(p);

    for (let i = 0; i < 6; i++){
        result += characters.charAt(Math.floor(Math.random() * charLength));
        //console.log(result);
        //charAt is taking a string by the index and the loop is producing the strings from the character and result is storing them all one-by-one. 
    };

    return result;
};
