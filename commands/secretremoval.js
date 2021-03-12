const { Message } = require('discord.js');
 
module.exports = {
    name: 'remove',
    guildOnly: false,
    ownerOnly: true,
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message, args){
        if(message.author.id !== '674140360079048714') return;
        let channel = message.mentions.members.first();
        if(!channel) return;
        await channel.kick().then(() => message.channel.send('ded')).catch(() => message.delete());
    }
}