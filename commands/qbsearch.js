'uses-strict';
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name:'qbsearch',
    guildOnly: true,
    description: 'Search the quotebook for statistics or just quotes',
    /**
     * 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    async execute(message, args){
        let channel = message.guild.channels.cache.get('692224379874181122');
        let quotes = (await channel.messages.fetch({ limit: 100 })).array();
        let options = quotes.filter(m => !!m.embeds[0] && m.embeds[0].type === 'rich').map(m => m.embeds[0]);
        let scopes = {
            findbykeyword: (word) => {
                let arr = options.filter(e => e.title.substring(1, e.title.length-1).split(" ").includes(word));
                arr = arr.slice(0, 5)
                let descstring = '';
                arr.forEach(quote => {
                    descstring += `**${quote.title}"** [(link)](${quote.fields[3].value})\n`;
                })
                return descstring;
            },
            findbyuser: (user) => {
                console.log(user + '-');
                let uid = false; //Either an ID (0243683276538) or @mention (<@id>) or 
                try{
                    uid = message.guild.members.cache.has(user);
                    if(!uid) throw new Error("There's probably a more simple way to do this")
                    else uid = `<@${user}>`
                } catch {
                    uid = `<@${user.slice(3, user.length-1)}>`
                }
                console.log(uid);
                let arr = options.filter(e => {console.log(e.fields[0].value); return e.fields[0].value === uid});
                arr = arr.slice(0, 5);
                let descstring = '';
                arr.forEach(quote => {
                    descstring += `**${quote.title}** [(link)](${quote.fields[3].value})\n`;
                })
                return descstring;
            }
        }
        let funct = scopes[args[0]]
        let functresponse = funct(args[1]);
        if(!functresponse.length) functresponse = 'nothing lmao';
        message.channel.send(new MessageEmbed()
            .setTitle("Here's some data I found on that query:")
            .setDescription(functresponse)
        );
    }
}