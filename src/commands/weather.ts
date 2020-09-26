import {Command} from "discot";
import * as request from "request-promise-native";

export default <Command>{
    name: 'weather',
    description: 'Reply with weather for choosen place.',
    action: message => {
        let city : string = message.content.split(' ').slice(1).join('+');
        let api_key : string = process.env.WEATHER_KEY ?? "";
        let url : string = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        let weather;

        (async () => {
            try{
                weather = JSON.parse(await request.get(url));

            }
            catch(e){
                message.channel.send("Malheuresement la requête au serveur météo a échoué");
                return;
            }
            try {
                let toSend = `Il fait ${weather.main.temp} degrés à ${weather.name}!`;
                message.channel.send({embed: {
                    color: 3447003,
                    title: `Voici la météo pour ${weather.name} :sun_with_face:`,
                    fields: [{
                        name: `:thermometer: TEMPERATURE :thermometer:` ,
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
                message.channel.send("Désolé, la météo n'a pas pu être récupérée...");
              }
        })();
    }
}


function timeConverter(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleString('fr'); // format "26/09/2020 à 13:12:12"
}
  
  
