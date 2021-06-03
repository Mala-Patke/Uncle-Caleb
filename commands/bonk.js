const { Message } = require('discord.js');
const enmap = require('enmap');
const bonkdb = new enmap('bonk');

module.exports = {
    name: 'bonk',
    guildOnly: true,
    ownerOnly: false,
    /**
     * @param {Message} message 
     * @param {string[]} args 
     */
    async execute(message, args){
        // if(!message.member.roles.cache.find(r => r.name === 'horny bonker')) return message.channel.send("You can't bonk people, you're not the horny bonker!");
        if(!message.mentions.members.size) return message.channel.send('s');
        let member = message.mentions.members.first();
        
        try { bonkdb.inc(member.id) } catch { bonkdb.set(member.id, 1) }
        let val = bonkdb.get(member.id);
        
        let str;
        switch (true) {
            case val < 3: str = "Resist the urge next time, 'kay?";
                break;
            case val < 6: str = "Hey, that's a lot of times. Doesn't your head hurt by now?";
                break;
            case val < 9: str = "Please, stop being horny, this is getting out of hand.";
                break;
            default: str = "You're a lost cause. Pack your things and leave";
                break;
        }

        message.channel.send(`${member} has been bonked. They've now been bonked ${val} times.\n` + str);
    }
}