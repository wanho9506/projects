window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.querySelector(".nav-desktop").style.background =
      "rgba(255, 255, 255, 0.1)";
    document.querySelector(".nav-mobile").style.background =
      "rgba(255, 255, 255, 0.1)";
  } else {
    document.querySelector(".nav-desktop").style.backgroundColor = "";
    document.querySelector(".nav-mobile").style.backgroundColor = "";
  }
}
