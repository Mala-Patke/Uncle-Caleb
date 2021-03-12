const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "pong",
    description:"Ping",
    guildOnly:false,
    execute(message, args){
        const embed = new MessageEmbed()
            .setTitle("Ping!")
            .addField("Bot's Ping", `${message.client.ws.ping}ms`);
        message.channel.send(embed);
    }
}