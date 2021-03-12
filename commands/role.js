const roles = require('../data/role.json');
const { Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "role",
    description: "Gives users a role",
    guildOnly:true,
    /**
     * 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(message, args){
        const embed = new MessageEmbed();
        if(!args.length){
            embed.setTitle('Here are the available roles:');
            let desc = '';
            roles.forEach(rol => desc+=`<@&${rol}>\n`);
            embed.setDescription(desc);
        } else {
            let givenrole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(" ").toLowerCase());
            if(!givenrole) embed.setTitle("ERROR: Role does not exist").setColor('RED');
            if(!roles.find(r => r === givenrole.id)){ embed.setTitle("Error: You don't have permission to get this role!").setColor('RED');
            } else {
                await message.member.roles.add(givenrole, 'Requested by user');
                embed.setTitle("Success!")
                     .setDescription(`Assigned the role ${givenrole} to ${message.member}.`)
                     .setColor('GREEN');
            }
        }
        message.channel.send(embed)
    }
}
