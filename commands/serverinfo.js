const Discord = require('discord.js')

module.exports = {
    name: "serverinfo",
    description: "Shows info about the server",
    guildOnly: false,
    execute(message, args){
        const guild = message.guild;
        const embed = new Discord.MessageEmbed()
            .setTitle("Server Info")
            .addField("Server Name", guild.name)
            .addField("Server Created at", guild.createdAt, true)
            .addField("Server Owner", guild.owner, true)
            .addField("Server Region", guild.region, true)
            .addField("Description", guild.description, true)
            .addField("Member Count", guild.memberCount,true)
            .addField("Server Boosts", `${guild.premiumSubscriptionCount}, Tier ${guild.premiumTier}`, true)
            .addField("Icon", guild.iconURL({format:"png"}))
            .setImage(guild.iconURL({format: "png"}));
        message.channel.send(embed);
    }
} 