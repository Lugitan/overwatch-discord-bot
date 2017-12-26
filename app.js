const overwatch = require('overwatch-js');
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();

// Create file with your bot's token
const token = fs.readFileSync('bot_token.txt').toString();

const platformOptions = ['pc', 'xbl', 'psn'];
let platform;

const regionOptions = ['us', 'eu', 'kr', 'cn', 'global'];
let region;


bot.on('ready', () => {
    console.log('Discord bot is now ready!');
  });

bot.on('message', message => {
    // Don't reply to bot messages
    if(message.author.bot) return;
    
    let stats = '!ow.stats';
    if (message.content.startsWith(stats)) {
        let battleTag = null;

        // standard search for player is set to pc and eu
        platform = platformOptions[0];
        region = regionOptions[1];
        
        //console.log(typeof(message));
        
        if (message.content.indexOf('#') > -1) {
            overwatch.getOverall('pc', 'eu', 'Lugitan-2628').then((player) => {
                let outputString = "Selected Overwatch-Player: ";
                outputString += "<:emoji_name:emoji_id>";
                outputString += player.profile.nick;
                
                message.reply(outputString);
            })
        } else if (message.content.startsWith("!ow.stats help")) {
            // Not a recognized command, show help
            showHelp(message);
        }
    }
});

bot.login(token);

let showHelp = (message) => {
    const helpText = '\n This bot will retrieve your Overwatch statistics \n Enter "!stats" and your Battle.net BattleTag to receive your stats \n Ex: !stats User#1234 \n\n Default options: Region: eu, Platform: pc \n To change these options, append your message with the following options \n\n Region: [region] \n Options: us, eu, kr, cn, global \n\n Platform: [platform] \n Options: pc, xbl, psn \n\n\n A full request might look like this: !stats User#1234 eu pc';
    message.reply(helpText);
  };