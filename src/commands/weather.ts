import {Command} from "discot";
import {get} from "request-promise-native";
const api_key: string = process.env.WEATHER_KEY ?? "";

export default <Command>{
    name: 'weather',
    description: 'Reply with weather for choosen place.',
    async action(message) {
        const city: string = message.content.split(' ').slice(1).join('+');
        const url: string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        try {
            const weather = JSON.parse(await get(url));
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: `Voici la météo pour ${weather.name} :sun_with_face:`,
                    fields: [
                        {
                            name: `:thermometer: TEMPERATURE :thermometer:`,
                            value: `**Actuel** : ${weather.main.temp} c° \n**Min** : ${weather.main.temp_min} c° \n**Max** : ${weather.main.temp_max} c°`
                        },
                        {
                            name: ":white_sun_rain_cloud: ETAT :white_sun_rain_cloud: ",
                            value: `**Global** : ${weather.weather[0].main} \n**Pression** : ${weather.main.pressure} hPa \n**Humidité** : ${weather.main.humidity} %`
                        },
                        {
                            name: ":wind_blowing_face: VENT :wind_blowing_face:",
                            value: `**vitesse** : ${weather.wind.speed} m/s \n**Orientation** : ${weather.wind.deg}° `
                        },
                        {
                            name: ":map: INFOS VILLE :map: ",
                            value: `**Nom** : ${weather.name} \n**Lon** : ${weather.coord.lon} \n**Lat** : ${weather.coord.lat}`
                        },
                        {
                            name: ":sunny: INFOS SOLEIL :sunny:",
                            value: `**Lever** : ${timeConverter(weather.sys.sunrise)} \n**Coucher** : ${timeConverter(weather.sys.sunset)}`
                        }
                    ],
                    timestamp: new Date(),
                }
            });
        } catch (e) {
            console.error(e);
            message.channel.send("Désolé, la météo n'a pas pu être récupérée...");
        }
    }
}

function timeConverter(UNIXTimestamp: number) {
    return new Date(UNIXTimestamp * 1000).toLocaleString('fr')
}
