const { Message, MessageAttachment } = require('discord.js');
 
module.exports = {
    name: 'leave',
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message){
        if(message.client.voice.connections.get(message.guild.id).channel) return message.client.voice.connections.get(message.guild.id).channel.leave();
    }
}