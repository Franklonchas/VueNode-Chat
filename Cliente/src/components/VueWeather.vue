<template>
    <div class="container">
        <div class="container text-white" id="name">
            Proyecto Vue.js - Francisco Javier Sánchez de la Torre
        </div>
        <div class="container text-white" id="format">
            <div id="infoPlace">
                <h1>Ciudad: {{name}}</h1>
                <span class="format2">Tiempo actual: </span>{{overcast}}<br>
                <span class="format2">Temperatura: </span>{{currentTemp}}°<br>
                <span class="format2">Temperatura mínima: </span>{{minTemp}}°<span
                    class="format2"> || Temperatura máxima: </span>{{maxTemp}}°<br>
                <span class="format2">Presión atmosférica: </span>{{pressure}} mbar<br>
                <span class="format2">Humedad: </span>{{humidity}}<br>
                <span class="format2">Viento: </span>{{wind}}<br>
                <span class="format2">Hora del amanecer: </span>{{sunrise}}0<br>
                <span class="format2">Hora de la puesta de sol: </span>{{sunset}}0<br>
            </div>
            <br><br><br><br><br><br><br>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    const API = 'http://api.openweathermap.org/data/2.5/weather?units=metric';
    const KEY = '&APPID=dfe44a7ee342e2aa8a08f9d3d263e48d';

    export default {
        name: "VueWeather",
        data: function () {
            return {
                currentTemp: '',
                name: '',
                minTemp: '',
                maxTemp: '',
                sunrise: '',
                sunset: '',
                pressure: '',
                humidity: '',
                wind: '',
                overcast: '',
                location: ''
            }
        },
        methods: {
            getWeather(url) {
                axios.get(url)
                    .then(response => {
                        this.name = response.data.name;
                        this.currentTemp = response.data.main.temp;
                        this.minTemp = response.data.main.temp_min;
                        this.maxTemp = response.data.main.temp_max;
                        this.pressure = response.data.main.pressure;
                        this.humidity = response.data.main.humidity + '%';
                        this.wind = response.data.wind.speed + 'm/s';
                        this.overcast = response.data.weather[0].description;
                        this.sunrise = new Date(response.data.sys.sunrise * 1000).toLocaleTimeString("en-GB").slice(0, 4);
                        this.sunset = new Date(response.data.sys.sunset * 1000).toLocaleTimeString("en-GB").slice(0, 4);
                    })
                    .catch(error => {
                        //console.log(error);
                    });
            },
            geolocation() {
                navigator.geolocation.getCurrentPosition(this.buildUrl, this.geoError);
            },
            buildUrl(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                this.getWeather("https://cors-anywhere.herokuapp.com/" + API + '&lat=' + lat + '&lon=' + lon + KEY);
            },
            geoError(error) {
                this.getWeather(API + '&lat=0&lon=0' + KEY);
            }
        },
        beforeMount() {
            this.geolocation();
        },
    }

</script>

<style scoped>

    #name {
        font-size: 30px;
        padding-left: 190px;
    }

    #format {
        padding-top: 100px;
        position: relative;
        top: 35%;
        left: 27%;
    }

    .format2 {
        font-weight: bold;
    }
</style>