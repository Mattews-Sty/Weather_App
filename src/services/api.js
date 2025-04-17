const API_KEY = import.meta.env.VITE_API_KEY;


// Obtener todos los elementos

export const getLocation = async (lat,lon) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang={lang}`);
        if (!response.ok) {
            throw new Error('Error al obtener los elementos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los elementos:', error);
    }
};

export const getCity = async (cityName) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Error al obtener los elementos');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener los elementos:', error);
    }
};

export const getIcon = (iconId) => {
    try {
        const iconUrl = (`https://openweathermap.org/img/wn/${iconId}@2x.png`);
        return iconUrl;
    } catch (error) {
        console.error('Error al obtener los elementos:', error);
    }
};
