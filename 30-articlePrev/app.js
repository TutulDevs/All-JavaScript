const toggle = document.querySelector(".toggle-icon");
const shareBox = document.querySelector(".shareBox");

function toggleBox(e) {
  const el = e.target.dataset.toggle;

  if (el === "up") {
    e.target.dataset.toggle = "down";
    shareBox.style.transform = "translateY(0%)";
  } else if (el === "down") {
    e.target.dataset.toggle = "up";
    shareBox.style.transform = "translateY(100%)";
  }
}

toggle.addEventListener("click", toggleBox);
