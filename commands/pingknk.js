module.exports = {
    name: "toggleping",
    description:"Ping",
    ownerOnly: true,
    guildOnly:false,
    execute(message, args){
        message.client.pingknk = !message.client.pingknk;
        message.channel.send(`Will now ${message.client.pingknk ? '' : 'not'} ping KebabnKuts after every message`);
    }
}