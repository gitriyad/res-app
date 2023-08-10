//Overlay caller
let overlay = document.querySelector(".overlay");

//Account Div toggle controller
let accountIconBtn = document.querySelector(".account>.icon");
accountIconBtn.addEventListener("click", () => {
  let infoDiv = document.querySelector(".account>.accountInfo");
  let opacity = window.getComputedStyle(infoDiv).opacity;
  let logInDiv = infoDiv.querySelector(".loggedIn");
  let notLoggedInDiv = infoDiv.querySelector(".notLoggedIn");
  if (opacity == 0) {
    infoDiv.style.opacity = 1;
    infoDiv.style.transform = "rotateX(0deg)";
    let isLoggedIn = JSON.parse(
      infoDiv.getAttribute("data-is-loggedIn").toLowerCase()
    );
    if (isLoggedIn) {
      notLoggedInDiv.style.display = "none";
      logInDiv.style.display = "block";
    } else {
      notLoggedInDiv.style.display = "flex";
      logInDiv.style.display = "none";
    }
  } else {
    notLoggedInDiv.style.display = "none";
    logInDiv.style.display = "none";
    infoDiv.style.opacity = 0;
    infoDiv.style.transform = "rotateX(-90deg)";
  }
});

//slogan Animation Controller
function sloganAnimation() {
  let slogan = document.querySelector(".slogan");
  let text = document.querySelector(".slogan").innerText;
  let textContainer = document.createElement("div");
  let delay = 0;
  let charCount = text.length;
  let root = document.documentElement;
  root.style.setProperty("--slogan-text-count", charCount);
  text.split("").forEach((v) => {
    let span = document.createElement("span");
    span.setAttribute("class", "anim");
    span.innerText = v;
    span.style.animationDelay = `${delay}s`;
    delay += 0.05;
    textContainer.appendChild(span);
  });
  slogan.innerHTML = textContainer.innerHTML;
}

//window click event handler
window.addEventListener("click", (e) => {
  // accountInfo div click toggole handler
  let accDiv = document.querySelector(".accountInfo");
  let opacity = window.getComputedStyle(accDiv).opacity;
  let logInDiv = accDiv.querySelector(".loggedIn");
  let notLoggedInDiv = accDiv.querySelector(".notLoggedIn");
  if (opacity == 1) {
    let allChild = [...accDiv.querySelectorAll("*")];
    if (allChild.some((child) => child == e.target)) {
    } else {
      accDiv.style.opacity = 0;
      accDiv.style.transform = "rotateX(-90deg)";
      notLoggedInDiv.style.display = "none";
      logInDiv.style.display = "none";
    }
  }
  // searchOption div click toggole handler
  let searchOptionDiv = document.querySelector(".searchIcon>.searchOption");
  let searchOptionDivOpacity = window.getComputedStyle(searchOptionDiv).opacity;
  if (searchOptionDivOpacity == 1) {
    let childs = [...searchOptionDiv.querySelectorAll("*")];
    if (
      childs.includes(e.target) ||
      e.target.getAttribute("class") == "searchOption" ||
      e.target.getAttribute("class") == "overlay"
    ) {
    } else {
      searchOptionDiv.style.opacity = 0;
      searchOptionDiv.style.transform = "rotateX(-90deg)";
    }
  }
});

//get Location controller
let locationBtn = document.querySelector(".getLocation");
let errorSms = document.querySelector(".errorSms");
let disInput = document.querySelector("input.disInput");
let thanaInput = document.querySelector("input.thanaInput");
let villInput = document.querySelector("input.villInput");
locationBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
  errorSms.innerText = "";
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        getAndSetPlace(lat, lon);
      },
      (err) => {
        if (err) {
          overlay.style.display = "none";
          errorSms.innerText = "";
          errorSms.innerText = `Error: ${err.message}`;
        }
      },
      { maximumAge: 1000 }
    );
  } else {
    errorSms.innerText = ``;
    errorSms.innerText = "geoLocation is not available";
  }
});
async function getAndSetPlace(lat, lon) {
  let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=15&addressdetails=1`;
  try {
    let res = await fetch(url);
    if (res.ok) {
      let data = await res.json();
      let dataArr = data.display_name.split(",");
      let vill = dataArr[0].trim();
      let thana = dataArr[1].trim();
      let dis = data.address.state_district.trim().split(" ")[0];
      disInput.value = dis;
      thanaInput.value = thana;
      villInput.value = vill;
      overlay.style.display = "none";
    } else {
      overlay.style.display = "none";
      throw new Error("Network Response Was Not Ok");
    }
  } catch (err) {
    overlay.style.display = "none";
    errorSms.innerText = "";
    errorSms.innerText = err.message;
  }
}
//SearchIcon Toggle controller
let searchIcon = document.querySelector(".searchIcon>.icon");
searchIcon.addEventListener("click", (e) => {
  let searchOptionDiv = document.querySelector(".searchOption");
  let opacity = window.getComputedStyle(searchOptionDiv).opacity;
  if (opacity == 0) {
    searchOptionDiv.style.opacity = 1;
    searchOptionDiv.style.transform = "rotateX(0deg)";
  } else {
    searchOptionDiv.style.opacity = 0;
    searchOptionDiv.style.transform = "rotateX(-90deg)";
  }
});
sloganAnimation();
