const { Message, MessageAttachment } = require('discord.js');
 
module.exports = {
    name: 'fetchauditlogs',
    guildOnly: true,
    ownerOnly: true,
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message, args){
        message.guild.fetchAuditLogs().then(logs => {
            message.channel.send(
                new MessageAttachment(
                    Buffer.from(logs.entries.array().map(e => `${e.executor.tag} did ${e.action} to ${e.target ? e.target || e.target.tag || e.target.name || 'something' : 'nothing'} on ${e.createdAt}`).join('\n')),
                    `auditlogs-${message.guild.id}.txt`
                )
            )
        })
    }
}