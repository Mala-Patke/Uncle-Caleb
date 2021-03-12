const { Message } = require('discord.js');

module.exports = {
    name: 'muteall',
    description:"Mutes everyone in a vc",
    guildOnly:true,
    /**
     * @param {Message} message Message
     */
    async execute(message){
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        let channel = message.member.voice.channel;
        for(let member of channel.members.array()){
            let ismuted = member.voice.serverMute;
            let reason = !ismuted ? 'Get Fucked' : 'Get Unfucked'
            await member.voice.setMute(!ismuted, reason);
        }
    }
}