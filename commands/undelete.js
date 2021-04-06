const { MessageEmbed, Message } = require('discord.js');

function sendUD(deleted){
    const embed = new MessageEmbed()
        .setTitle(`Last deleted message in #${deleted.channel.name}`)
        .setAuthor(deleted.author.username, deleted.author.avatarURL())
        .setDescription(deleted.content)
        .setTimestamp(deleted.createdTimestamp);
    if(deleted.attachments.size){
        embed.setImage(deleted.attachments.first().proxyURL)
    }
    deleted.channel.send(embed);
}

module.exports = {
    name: 'undelete',
    guildonly: true, 
    description: 'Retrieves the last Deleted Message in a channel',
    /**
     * @param {Message} message 
     * @param {string[]}
     */
    execute(message, args){
        /** @type {Message[]} */
        let deleted = message.client.deleted.get(message.channel.id);
        if(!deleted || !deleted.length) return message.channel.send(new MessageEmbed().setTitle(`Error: Could not find any deleted messages in #${message.channel.name}`).setColor('RED'));
        if(!args.length){
            if(deleted.length === 1) return sendUD(deleted[0]);
            let det = '';
            deleted.forEach((del, index) => {
                det+=`${index+1}) ${del.content.slice(0, 20)}...`
                if(del.hasAttachments) det+=`(Has Attatchment)`;
                det+='\n'
            })
            const embed = new MessageEmbed()
                .setTitle(`Multiple Deleted Messages have been found`)
                .setDescription(det);
            message.channel.send(embed);
        } else {
            let int = parseInt(args[0]);
            if(int > deleted.length) return message.channel.send(`Could not find deleted Message with index ${int}`);
            sendUD(deleted[int+1]);
        }
    }
}