
let mainDiv=document.querySelector(".container");

//fetch data in api

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.forEach((element) => {
      const countryObject = {
        name: element.name.common,
        flags: element.flags.png,
        capital: element.capital ? element.capital[0]:element.capital, 
        region: element.region,
        countryCodes:element.cca3,
        latlng:element.latlng,
   
    };
      createCountryCard(countryObject);
     
    });
   
  })
  .catch((err) => console.log("error : ", err));

//fetch weather


   getWeather=async(latlng)=>{
    let apiKey="38072ffea4c9c4bf2cbe0d6d45913be8";
let weatherApi=`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`;
let weatherObj=await fetch(weatherApi);
let response=weatherObj.json();
return response;

// .then((weather)=>weather.json())
// .then((details)=>{
//   console.log(details);
//   const objectValues=Object.values(details);
// for(keys in objectValues){
//   const values={
//     coord:objectValues[keys],
//       };
//      weatherCard(values);
//     //  console.log(`lat:${values.coord.lat},lng:${values.coord.lon}`);
// }
// })
// .catch((err) => console.log("error : ", err));

}

// create countryCard
const divCreate=document.createElement("div");  
function createCountryCard(element) {
  divCreate.className= "row" ;
  divCreate.innerHTML += `
      <div class="col card">
        <H1 id="title" class="text-center">${element.name}</H1> 
        <div class="col card-header"> 
          <img id="flag" class="card-img-top" src="${element.flags}" alt="${element.name}">
        </div>
          <div class=" col card-body">
             <p ><span class="card-text"> Capital : ${element.capital}</span></p>
             <p ><span class="card-text" > Region : ${element.region}</span></p>
             <p ><span class="card-text"> countryCodes: ${element.countryCodes}</span></p>
          <div class="col"> <button id="btn" class="btn-primary" onClick="${getWeather(element.latlng)}">Get weather</button>
          </div>
          </div>
        </div>  
  </div>
          
          `;
}
mainDiv.append(divCreate);

async function weatherCard(){
  console.log(val)
//  mainDiv.append=val;
  // alert(`${values.weather}`);
}