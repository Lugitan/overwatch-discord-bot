const overwatch = require('overwatch-js');
const Discord = require('discord.js');
const fs = require('fs');

const bot = new Discord.Client();

// Create file with your bot's token
const token = fs.readFileSync('bot_token.txt').toString();

bot.on('ready', () => {
    console.log('Discord bot is now ready!');
  });

bot.on('message', message => {
    // Don't reply to bot messages
    if(message.author.bot) return;
  
    let stats = 'ow.stats';
    if (message.content.startsWith(stats)) {
        overwatch.getOverall('pc', 'eu', 'Lugitan-2628').then((player) => {
            let outputString = "Selected Overwatch-Player: ";
            outputString += player.profile.nick;
            message.reply(outputString);
        });
    }
});

bot.login(token);