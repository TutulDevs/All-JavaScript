const boxes = document.querySelectorAll('input[type="checkbox"');

let lastChecked; // for checking the last checked checkbox

function handleCheck(e) {
    let flag = false; // flag var for checking

    // IF the shiftKey = true && current el is checked
    if (e.shiftKey && this.checked) {
        // Loop over every single checkbox
        boxes.forEach((box) => {
            console.log(box);

            // flag = true; will check in one direction, flippin/ making opposite won't
            if (box === this || lastChecked === box) {
                flag = !flag;
                console.log('box s / e');
            }

            // IF the flag is true, check the boxes
            if (flag) box.checked = true;
        });
    }

    lastChecked = this; // assinging the last checkbox
}

// Main Event
boxes.forEach((el) => el.addEventListener('click', handleCheck));

// clear the boxes & console
document.querySelector('.clear').addEventListener('click', () => {
    boxes.forEach((el) => {
        el.checked = false;
        console.clear();
    });
});
