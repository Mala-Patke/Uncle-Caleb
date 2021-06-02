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
        if(!channel) return;
        console.log(channel)
        if(message.attachments.size) attach = new MessageAttachment(message.attachments.first().attachment, message.attachments.first().name);
        channel.send(args.slice(1, args.length).join(" "), { files:[attach] })
            .catch(() => {
                channel.send(args.slice(1, args.length).join(" "))
            });
    }
}