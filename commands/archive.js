const { Message, MessageAttachment } = require('discord.js');
const { writeFileSync } = require('fs')
 
module.exports = {
    name: 'archive',
    guildOnly: false,
    ownerOnly: true,
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message, args){
        /** @type {import('discord.js').TextChannel} */
        let channel = message.client.channels.cache.get(args[0]) || message.channel ;
        channel.messages.fetch({ limit: 100 }).then(messages => {
            message.channel.send(new MessageAttachment(Buffer.from(messages.array().reverse().map(m => `${m.author.tag} - ${m.createdAt}: ${m.content} ${message.attachments.first() ? message.attachments.first().url : ''}`).join('\n')), `${channel.name}.txt`));
        })
    }
}