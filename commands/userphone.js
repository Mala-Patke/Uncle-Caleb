const { Message } = require('discord.js');

module.exports = {
    name: "userphone",
    guildOnly: false,
    ownerOnly: true,
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(message, args){
        if(message.author.id !== "674140360079048714");
        let globalfilter = m => !m.author.bot;

        let localchannel = message.channel;
        let localcollector = localchannel.createMessageCollector(globalfilter);

        let foreignchannel = message.client.channels.cache.get(args[0]) || message.client.users.cache.get(args[0]);
        let foreigncollector = foreignchannel.createMessageCollector(globalfilter);
        
        message.channel.send(`Connection established to ${foreignchannel.name}`);

        localcollector.on("collect", () => {
            let msg = localchannel.lastMessage;
            if(msg.content === ";exit"){
                localcollector.emit("stop");
                return;
            }
            foreignchannel.send(msg.content);
        })

        localcollector.on("stop", () => {
            localcollector.stop();
            foreigncollector.stop();
        })

        foreigncollector.on("collect", () => {
            let msg = foreignchannel.lastMessage;
            localchannel.send(`**${msg.author.username}**: ${msg.content}`);
        })
    }
}