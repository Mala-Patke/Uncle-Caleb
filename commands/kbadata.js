const { MessageEmbed, Message } = require('discord.js');
const Enmap = require('enmap');
const enmap = new Enmap('kba');

module.exports = {
    name: "kbmdata",
    guildOnly: true, 
    /**
     * 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    execute(message, args){
        args.map(x => x.toLowerCase());
        const scopes = {
            findbyid: (id) => {
                return [{
                    id:id, 
                    kbm:enmap.get(id)
                }];
            },
            findbyuser: (user) => {
                let values = enmap.array().filter(u => u.user === user);
                let data = [];
                values.forEach(value => {
                    let id = enmap.findKey(v => v === value);
                    let obj = {
                        id:id,
                        kbm:value
                    }
                    data.push(obj);
                })
                return data;
            }, 
            findbyban: (user) => {
                let values = enmap.array().filter(u => u.ban === user);
                let data = [];
                values.forEach(value => {
                    let id = enmap.findKey(v => v === value);
                    let obj = {
                        id:id,
                        kbm:value
                    }
                    data.push(obj);
                })
                return data;
            },
            findbymod: (user) => {
                let values = enmap.array().filter(u => u.mod === user);
                let data = [];
                values.forEach(value => {
                    let id = enmap.findKey(v => v === value);
                    let obj = {
                        id:id,
                        kbm:value
                    }
                    data.push(obj);
                })
                return data;
            },
            findbykick: (user) => {
                let values = enmap.array().filter(u => u.kick === user);
                let data = [];
                values.forEach(value => {
                    let id = enmap.findKey(v => v === value);
                    let obj = {
                        id:id,
                        kbm:value
                    }
                    data.push(obj);
                })
                return data;
            }
        }
        let arg1 = args[1];
        if(!(parseInt(arg1, 10))) arg1 = arg1.substring(3, arg1.length-1);
        console.log(arg1);
        let funct = scopes[args[0]];
        let scope = funct(arg1);
        let descstring = '';
        scope.forEach(val => {
            descstring += `${val.id} (${message.guild.members.cache.get(val.kbm.user)}) => Kick: ${message.guild.members.cache.get(val.kbm.kick)}, Ban: ${message.guild.members.cache.get(val.kbm.ban)}, Mod: ${message.guild.members.cache.get(val.kbm.mod)}\n`;
        })
        const embed = new MessageEmbed()
            .setTitle("Here's some data that I found regarding your queries")
            .setDescription(descstring)
            .setTimestamp();
        message.channel.send(embed);
    }
}