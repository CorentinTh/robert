import {Command} from "discot";
import axios from "axios";

if(!process.env.WEATHER_KEY) throw "WEATHER_KEY is missing";

export default <Command>{
    name: 'weather',
    description: 'Reply with weather for choosen place.',
    async action(message) {
        const city: string = message.content.split(' ').slice(1).join('+');
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`;
        try {
            const {data} = await axios.get(url);
            message.channel.send({
                embed: {
                    color: 3447003,
                    title: `Voici la météo pour ${data.name} :sun_with_face:`,
                    fields: [
                        {
                            name: `:thermometer: TEMPERATURE :thermometer:`,
                            value: `**Actuel** : ${data.main.temp} c° \n**Min** : ${data.main.temp_min} c° \n**Max** : ${data.main.temp_max} c°`
                        },
                        {
                            name: ":white_sun_rain_cloud: ETAT :white_sun_rain_cloud: ",
                            value: `**Global** : ${data.weather[0]?.main ?? "Indisponible"} \n**Pression** : ${data.main.pressure} hPa \n**Humidité** : ${data.main.humidity} %`
                        },
                        {
                            name: ":wind_blowing_face: VENT :wind_blowing_face:",
                            value: `**vitesse** : ${data.wind.speed} m/s \n**Orientation** : ${data.wind.deg}° `
                        },
                        {
                            name: ":map: INFOS VILLE :map: ",
                            value: `**Nom** : ${data.name} \n**Lon** : ${data.coord.lon} \n**Lat** : ${data.coord.lat}`
                        },
                        {
                            name: ":sunny: INFOS SOLEIL :sunny:",
                            value: `**Lever** : ${timeConverter(data.sys.sunrise)} \n**Coucher** : ${timeConverter(data.sys.sunset)}`
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
    return new Date(UNIXTimestamp * 1000).toLocaleString('fr-FR')
}
