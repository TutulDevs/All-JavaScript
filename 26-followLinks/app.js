// select all the links, that need to track
const allLinks = document.querySelectorAll('a');

// create a highlight element
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function followLink() {
    // get coordinates of links
    const linkCoords = this.getBoundingClientRect();

    // get coords based on scroll X Y
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX,
    };
    //console.log(coords);

    // now add style to css
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

// on mouseenter
allLinks.forEach((a) => a.addEventListener('mouseenter', followLink));
