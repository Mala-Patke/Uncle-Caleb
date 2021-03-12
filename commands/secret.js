const { Message, MessageAttachment } = require('discord.js');
 
module.exports = {
    name: 'secret',
    guildOnly: false,
    ownerOnly: true,
    /**
     * 
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message, args){
        let attach = null;
        let channel = message.mentions.channels.first();
        await message.delete();
        if(message.author.id !== '674140360079048714') return;
        if(!channel) return;
        if(!!message.attachments.size) attach = new MessageAttachment(message.attachments.first().attachment);
        channel.send(args.slice(1, args.length).join(" "), { files:[attach] })
            .catch(err => {
                channel.send(args.slice(1, args.length).join(" "));
            });
    }
}