const { Client } = require('discord.js');
const client = new Client;
global.config = require("./config.json");
const getServerOnline = require("./src/samp.js");
var c = 0;
var uptext;

client.on('ready', () => {
    console.log(`BOT ${client.user.tag} ONLINE!!!`);
    UpTimer();setInterval(UpTimer,1000);
    UpdateStatus();setInterval(UpdateStatus,5000);
});

function UpTimer() 
{
    var mins  = Math.floor((c/60) % 60);
    var hours = Math.floor((c/(60*60)));
    hours = hours < 10 ? `0` + hours:hours;
    mins = mins < 10 ? `0` + mins:mins;
    c++;
    uptext = `${hours}j ${mins}m Uptime`
}

function UpdateStatus()
{
    getServerOnline("sg-game3.raznar.host", 7777, function (error, response) {
        if(error)
        {
            c = 0;
            var stats = "Server Offline"
            client.user.setActivity(stats, {type:'PLAYING'})
        }
        else
        {
            var stats = `${response} Players WorldWar SAMP`
            client.user.setActivity(stats, {type:'PLAYING'})
        }
    })
}

client.login(config.token);
