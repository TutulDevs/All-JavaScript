const qs = (el) => document.querySelector(el);

const inputs = document.querySelectorAll('.controls input');

// Get & Display values
function displayValue() {
    const radius = qs('#radius').value;
    const offX = qs('#off-x').value;
    const offY = qs('#off-y').value;
    const blur = qs('#blur').value;
    const spread = qs('#spread').value;
    const color = qs('#base').value;

    const borr = qs('.border-radius');
    const boxShadow = qs('.box-shadow');
    borr.innerHTML = `border-radius: ${radius}px`;
    boxShadow.textContent = `box-shadow: ${offX}px ${offY}px ${blur}px ${spread}px ${color};`;

    /*
    const markup = `border-radius: ${radius}px;
        
        box-shadow: ${offX}px ${offY}px ${blur}px ${spread}px ${color};`;

    //const mark2 = 'border-radius: ' + radius + '\n' + 'box-shadow: ' +
    //console.log(markup);
    const displ = qs('.display');
    displ.textContent = markup;
    */
}

// Handle the Update

function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    //console.log(suffix);

    document.documentElement.style.setProperty(
        `--${this.name}`,
        this.value + suffix
    );

    displayValue();
}

inputs.forEach((input) => input.addEventListener('change', handleUpdate));
inputs.forEach((input) => input.addEventListener('mousemove', handleUpdate));
