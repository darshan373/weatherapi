const weatherform=document.getElementById("weatherform");
const cityname=document.getElementById("cityname");
const card=document.getElementById("card");
const apikey="e638ff84c475c92c7609c96483c5097e";

weatherform.addEventListener("submit", async (event)=>{
event.preventDefault();

const city=cityname.value;

if(city){
   const weatherdata=await getweatherdata(city);
   showweatherdata(weatherdata);
}else{
    displayerror("Please enter a city name")
}
})
async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response=await fetch(apiurl);
    console.log(response);
    if(!response.ok){
        card.style.display = 'none';
        displayerror("Couldn't find weather data")
        throw new Error("Couldn't find weather data");
    }
    return await response.json();
}
function showweatherdata(data){
const { name:city, main:{temp,humidity},weather:[{description,id}]}=data;
card.textContent="";            
card.style.display="flex";
let temp1=kelvinToCelsius(temp).toFixed(2);
const displaycity=document.createElement("h1");
const displaytemp=document.createElement("p");
const displayhum=document.createElement("p");
const displaydesc=document.createElement("p");
const displayemoji=document.createElement("p");

displaycity.textContent=city;
displaycity.classList.add("displaycity");
card.appendChild(displaycity);

displaytemp.textContent=`${temp1}°C`;
displaytemp.classList.add("tempdisplay");
card.appendChild(displaytemp);

displayhum.textContent=`${humidity}%`;
displayhum.classList.add("humdisplay");
card.appendChild(displayhum);

displaydesc.textContent=description;
displaydesc.classList.add("descdisplay");
card.appendChild(displaydesc);

displayemoji.innerHTML=displayemojii(id);
displayemoji.classList.add("weatheremoji");
card.appendChild(displayemoji);

}
function displayemojii(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
                     return "🌩️";        
        case (weatherId >= 300 && weatherId < 400):
                     return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
                     return "⛈️";
        case (weatherId >= 600 && weatherId < 700):
                     return "❄️";
        case (weatherId >= 700 && weatherId < 800):
                     return "☁️";
        case (weatherId === 800):
                     return "☀️";
        case (weatherId >= 801 && weatherId < 810):
                     return "☁️";
        default:
                     return "🤔";
}
}
function displayerror(msg){
const errordisplay=document.createElement("p");
errordisplay.textContent=msg;
errordisplay.classList.add("errordisplay");
card.textContent="";
card.style.display="flex";
card.appendChild(errordisplay);
}
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}