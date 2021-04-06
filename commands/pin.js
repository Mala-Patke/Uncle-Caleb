const { Message } = require('discord.js');
 
module.exports = {
    name: 'pin',
    guildOnly: true,
    ownerOnly: true,
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    async execute(message, args){
        if(!args.length) return message.delete();
        let messages = await message.channel.messages.fetch(args[0]);
        if(!messages) return message.delete();
        messages.pin({ reason: 'Pog Message' });
    }
}