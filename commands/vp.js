const { Message } = require('discord.js');
 
module.exports = {
    name: 'viewperms',
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message, args){
        let member = message.mentions.members.first() || message.member;
        let channel = message.mentions.channels.first();
        let perms = (channel ? member.permissionsIn(channel) : member.permissions).toArray().join(', ');
        message.channel.send(
            `**${member.nickname || member.user.username}** has the following permissions${channel ? ` in ${channel}` : ''}: \`\`\`${perms}\`\`\``
        ).catch(() => console.log(perms))
    }
}