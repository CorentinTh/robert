# Robert
Robert is a discord bot made using the [discot](https://github.com/CorentinTh/discot/) framework.

# New features !
 - Type **!cnfact** for a random Chuck Norris fact
 - Type **!weather {city}** for weather informations about the given city

# Available commands
- **!weather {city}** for weather informations about the given city
- **!cnfact** for a random Chuck Norris fact
- **!ping** to get a "pong" answer
- **!play {url}** to play a youtube audio in the current channel
- **!stop** to stop the bot from playing audio
- **!mock {text}** to mock a sentence like the famous [spongebob meme](https://raw.githubusercontent.com/dhildebr/spongebob-case/master/memEs%20aRen't%20a%20SeRious%20SubjECt.jpg)

# Installation

Follow these steps to run the bot locally :
```sh
git clone https://github.com/CorentinTh/robert.git
cd robert
npm install
tsc && npm start #compile typescript and run node
```

Note that you need some API Keys :
- ```DISCORD_TOKEN``` : [A Discord API Key](https://discord.com/developers/applications)
- ```WEATHER_KEY```[An Open Weather Map API Key](https://openweathermap.org/price)
# Used technologies

The bot actually uses the following packages :
- ffmpeg-static: 3.0.0
- fluent-ffmpeg": 2.1.14
- node: 13.7.0,
- typescript: 3.7.5
- axios: 0.20.0
- discot: 1.3.1
- fluent-ffmpeg: 2.1.2
- node-opus: 0.3.3
- ytdl-core": 1.0.7