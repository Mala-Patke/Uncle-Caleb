const { Message, MessageAttachment, GuildAuditLogsEntry } = require('discord.js');

/**
 * @param {GuildAuditLogsEntry} entry 
 */
function mapper(entry){
    let line = `${entry.executor.tag} did ${entry.action} to `;

    switch (entry.targetType){
        case 'USER':line+=entry.target.tag+' ';
            break;
        case 'CHANNEL':line+=`#${entry.target.name} `;
            break;
        case 'MESSAGE':line+=`${entry.target.id} in #${entry.target.channel.name}`
            break;
        default: line += 'something '
    }

    if(entry.changes && entry.changes.length) line += `which includes ${entry.changes.map(e => `"${e.key} ${JSON.stringify(e.new)}"`).join(', ')} `

    if(entry.reason) line += `because ${entry.reason} `

    line+= `on ${entry.createdAt.getMonth()}/${entry.createdAt.getDate()}/${entry.createdAt.getFullYear()} at ${entry.createdAt.getHours()}:${entry.createdAt.getMinutes()}`

    return line;
}
 
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
            let logstring = logs.entries
                .array()
                .map(mapper).join('\n');
            message.channel.send(
                new MessageAttachment(
                    Buffer.from(logstring),
                    `auditlogs-${message.guild.id}.txt`
                )
            ).catch(() => {
                console.log(logstring)
            })
        })
    }
}