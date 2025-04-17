<template>
    <div class="flex h-screen justify-center items-center font-urbanist">
        <div class=" flex flex-col justify-evenly items-center w-64 h-80 rounded-2xl bg-darkblue ">
            <div class="flex justify-evenly item-center w-full h-auto">
                <div class="flex gap-1 w-40 h-auto">
                    <input type="text" v-model="requestedCity" class="p-2 w-32 rounded-md border-2 border-blue-500" placeholder="Search City">
                    <button @click="fetchCity" class="bg-blue-500 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#fff" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg></button>
                </div>
                <p class="text-white text-lg  w-1/4 font-bold text-center leading-none">{{ today }}</p>
            </div>

            <div class="flex justify-center bg-blue-500 items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#fff" d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2m6-1.8C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14c4.05-3.7 6-6.8 6-9.14M12 2c4.2 0 8 3.22 8 8.2c0 3.32-2.67 7.25-8 11.8c-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2"/></svg>
                <h2 v-show="city?.name" class="text-2xl font-bold text-white">{{ city?.name }}</h2>
            </div>
            <div class="flex justify-between w-60 items-center items-end">
                <img :src="ICON_URL" alt="Clima" v-if="ICON_URL" class="object-scale- w-24 h-24"/>
                <div class="flex flex-col justify-center items-center  w-32 items-end">
                    <p class="text-white text-3xl font-bold text-right">{{ temp }} °C</p>
                    <p v-if="city.weather && city.weather.length > 0" class="text-white text-md font-bold text-right">{{ city.weather[0].description }}</p>
                </div>
            </div>
            <div class="flex justify-evenly w-full items-center">
                
                <div class="flex flex-col justify-center items-center ">
                    <img src="../assets/icons/humedad.png" class="w-1/2">
                    <p class="text-white text-xl font-bold text-right">{{ humidity }}%</p>
                    <p class="text-white text-sm font-bold text-right"> Humidity</p>
                </div>
                <div class="flex flex-col justify-center items-center ">
                    <img src="../assets/icons/signo-de-viento.png" class="w-2/5">
                    <p class="text-white text-xl font-bold text-right">{{ windSpeed }}m/s</p>
                    <p class="text-white text-sm font-bold text-right">Wind Speed</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { getCity, getIcon, getLocation } from '../services/api.js'
    import { tempToCelcius } from '@/utils/tempToCelcius.js'

    const city = ref({});
    const requestedCity = ref('');
    const ICON_URL = ref('');
    const humidity = ref('');
    const windSpeed= ref('');
    const temp = ref(0);
    
    

    const formatDate = () => {
    const date = new Date();

    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('en-En', options).format(date);
    };

    const today = ref(formatDate());
    today.value = formatDate().charAt(0).toUpperCase() + formatDate().slice(1);



    const fetchCity = async () => {
        if (!requestedCity.value.trim()) return;

        console.log(`Buscando: ${requestedCity.value.trim()}`);
        const data = await getCity(requestedCity.value.trim());
        city.value = data;
        fetchIcon();
        if (data?.main?.temp !== undefined) {
            temp.value = tempToCelcius(data.main.temp);
            humidity.value = data.main.humidity;
            windSpeed.value = data.wind.speed;
        } else {
            alert("No se pudo obtener la ciudad");
        }
    };

    const fetchLocation = async (lat, lon) => {
        const data = await getLocation (lat, lon);
        city.value = data;
        fetchIcon();
        if (data?.main?.temp !== undefined) {
            temp.value = tempToCelcius(data.main.temp);
            humidity.value = data.main.humidity;
            windSpeed.value = data.wind.speed;
            } else {
            alert("No se pudo obtener la ciudad");
        }
    };

    const fetchIcon = () => {
        const iconId = city.value.weather[0].icon;
        ICON_URL.value = getIcon(iconId);
    };

    onMounted(() => {
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchLocation(lat,lon);
                },
                (error) => {
                    console.error("Error al obtener ubicación:", error.message);
                }
            );
        } else {
            console.error("La geolocalización no es compatible con este navegador.");
        }
    } catch (error) {
        console.log(error);
    }
    });
</script>

