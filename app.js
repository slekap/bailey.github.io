window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureApparent = document.querySelector('.temperature-apparent');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span');
    const apparentTemperatureSpan = document.querySelector('.apparent-span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}https://api.darksky.net/forecast/75dcaeb02e5a9510bbd46298517f8fda/${lat},${long}`;
            fetch(api)
            .then(data =>{
                return data.json();
            })
            .then(data =>{
                const {temperature, apparentTemperature, summary, icon} = data.currently;
                //set dom elements from darksky API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureApparent.textContent = Math.floor(apparentTemperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celsius = (temperature - 32) * (5 / 9);
                let apparentCelsius = (apparentTemperature - 32) * (5 / 9);

                setIcons(icon, document.querySelector('.icon'));

                temperatureSection.addEventListener('click', () =>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        apparentTemperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                        temperatureApparent.textContent = Math.floor(apparentCelsius)
                    }else{
                        temperatureSpan.textContent = "F";
                        apparentTemperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                        temperatureApparent.textContent = Math.floor(apparentTemperature);
                    }
                })
            });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});