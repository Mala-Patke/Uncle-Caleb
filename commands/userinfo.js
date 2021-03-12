const Discord = require("discord.js");

module.exports = {
    name:"userinfo",
    description:"Displays info about a user",
    guildOnly:false,
    usage: "-userinfo <user(optional)>",
    /**
     * @param {import('discord.js').Message} message 
     * @param {string[]} args 
     */
    execute(message, args){
        let embed = new Discord.MessageEmbed();
        let taggedUser = message.mentions.members.first();
        if(!args.length) taggedUser = message.member;
            embed
                .setTitle(`${taggedUser.user.username}'s info`)
                .addFields(
                    {name: "Username", value: taggedUser.user.tag, inline: true},
                    {name: "Server Nickname", value: taggedUser.nickname, inline: true},
                    {name: "Discord ID", value: taggedUser.id, inline: true},
                    {name: "Server Join Date", value: taggedUser.joinedAt, inline: true},
                    {name: "Avatar link", value: taggedUser.user.avatarURL(), inline: true},
                    {name: "Roles", value: taggedUser.roles.cache.array().map(a => `<@&${a.id}>`).join(`, `), inline: true}
                ).setThumbnail(taggedUser.user.displayAvatarURL({ format: 'png'}));
        message.channel.send(embed);
    }
}