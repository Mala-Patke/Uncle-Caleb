const { Message } = require('discord.js');
 
module.exports = {
    name: 'join',
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message, args){
        /** @type {import('discord.js').VoiceChannel} */
        let channel = message.client.channels.cache.get(args[0]) || message.member.voice.channel;
        if(!channel) return message.channel.send('Invalid Channel ID');
        channel.join().then(res => {
            //maybe play some music idk
        });
    }
}