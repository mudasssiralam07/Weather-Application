const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api");
    }
});

let API_KEY="120ca5674313af7ba32b66a45b86ef4b";
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            wIcon.src = "icons/clear.svg";
            document.body.style.backgroundImage = "url('images/clear.jpg')";
            document.body.style.backgroundRepeat ="no-repeat";
            document.body.style.backgroundSize= "cover";

        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
            document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
            document.body.style.backgroundRepeat ="no-repeat";
            document.body.style.backgroundSize= "cover";

        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
            document.body.style.backgroundImage = "url('images/snow.jpg')";
            document.body.style.backgroundRepeat ="no-repeat";
            document.body.style.backgroundSize= "cover";

        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
            document.body.style.backgroundImage = "url('images/cloud.jpg')";
            document.body.style.backgroundRepeat ="no-repeat";
            document.body.style.backgroundSize= "cover";

        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
            document.body.style.backgroundImage = "url('images/cloud.jpg')";
            document.body.style.backgroundRepeat ="no-repeat";
            document.body.style.backgroundSize= "cover";
            
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
            document.body.style.backgroundImage = "url('images/rain.jpg')";
            document.body.style.backgroundRepeat ="no-repeat";
            document.body.style.backgroundSize= "cover";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
document.querySelector(".date").innerHTML=d.getDate()+" "+months[d.getMonth()]+" "+d.getFullYear();
document.querySelector(".day").innerHTML=day[d.getDay()];
function display(){
    var refresh=1000; 
    mytime=setTimeout('displaytime()',refresh)
}
function displaytime(){
    const x = new Date();
    var hour=x.getHours();
    var min=x.getMinutes();
    var suf="AM";
    if(hour>=12) {suf="PM";hour=hour-12;}
    if(min<10) min='0'+min;
document.querySelector(".time").innerHTML=hour+":"+min+" "+suf;
display();
}
displaytime();

