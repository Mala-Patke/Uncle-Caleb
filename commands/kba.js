const { Message, MessageEmbed } = require('discord.js');
const Enmap = require('enmap');
const enmap = new Enmap('kba');

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function genID(){
    let id = '';
    for(let i = 0; i < 10; i++){
        let random = Math.floor(Math.random() * 9);
        id+=`${random}`;
    }
    if(enmap.keyArray().includes(id)) genID();
    return id;
}

module.exports = {
    name: 'kbm',
    description:'Plays a nice game of Kick, Ban, or Mod',
    guildOnly: true,
    /**
     * 
     * @param {Message} message 
     * @param {*} args 
     */
    async execute(message, args){
        let members = message.guild.members.cache.filter(u => !u.roles.cache.has('542554056040644628') && !u.user.bot && u.user.id !== message.author.id).array();
        shuffle(members);
        let threeusers = members.slice(0,3);
        let userstring = '';
        for(let i in  threeusers){
            userstring += `${parseInt(i)+1}) ${threeusers[i]}\n`
        }
        const embed = new MessageEmbed()
            .setTitle('Kick, Ban, or Mod?')
            .setDescription(userstring);
        await message.channel.send(embed);
        await message.channel.send(`Who do you want to kick?`);
        let filter = m => 
            m.author.id === message.author.id &&
            !!parseInt(m.content, 10) &&
            parseInt(m.content, 10) <= 3 &&
            !m.author.bot;
        let collector = message.channel.createMessageCollector(filter, {time: 60000});
        let iterator = 0;
        let responses = [];
        collector.on('collect', collected => {
            console.log('collected:'+ collected.content);
            if(responses.includes(collected.content)) return message.channel.send("You've already selected that option");
            iterator++;
            if(iterator === 1){
                responses.push(collected.content);
                message.channel.send('Who do you choose to ban? (1, 2, 3)');
            }
            else {
                responses.push(collected.content);
                for(let i in threeusers){
                    i = (parseInt(i)+1).toString();
                    console.log(`i: ${i}`);
                    if(!responses.includes(i)) {
                        responses.push(i);
                        break;
                    }
                }
                collector.stop();
            }
        })
        collector.on('end', () => {
            console.log('stopped');
            console.log(responses);
            let data = {
                user: message.author.id,
                kick: threeusers[responses[0]-1].user.id,
                ban: threeusers[responses[1]-1].user.id,
                mod: threeusers[responses[2]-1].user.id
            }
            let id = genID();
            console.log(id);
            const embed2 = new MessageEmbed()
                .setTitle('Your selections have been recorded!')
                .setDescription(`Kick: ${message.guild.members.cache.get(data.kick)}\nBan: ${message.guild.members.cache.get(data.ban)}\nMod: ${message.guild.members.cache.get(data.mod)}`)
                .addField(`You can find the results under this id:`, id)
                .setFooter(data.user);
            enmap.set(id, data);
            message.channel.send(embed2);
        })
    }
}