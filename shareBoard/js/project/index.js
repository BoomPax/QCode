function init(){
    removeNavArrow();
}

function removeNavArrow(){
    let arrow = document.querySelector(".navbar-visibility-button");
    arrow.remove();
}

init();