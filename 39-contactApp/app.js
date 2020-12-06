////////////////////        Sort the contacts [put at the end]

const contactList = document.querySelector('.contacts');

[...contactList.children]
.sort((a, b) =>
    a.dataset.name < b.dataset.name ? -1: 1)
.forEach(node => contacts.appendChild(node));