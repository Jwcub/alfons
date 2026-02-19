document.addEventListener("DOMContentLoaded", () => { 

const animationButton = document.getElementById("show-animation");
animationButton.addEventListener("click", displayAnimation);

function displayAnimation() {
    const gif = document.querySelector(".gif");

        gif.style.animationPlayState = "running"
  }

})

