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
        let messages = await message.channel.messages.fetch({ limit: 50 });
        if(!messages.has(args[0])) return message.delete();
        messages.get(args[0]).pin({ reason: 'Pog Message' });
    }
} 