const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'commands',
    description: 'List of all commands',
    guildOnly: true,
    execute(message, args){
        const commands = message.client.commands;
        let embed = new MessageEmbed();
        //General Help
        if (!args.length){
            embed
                .setTitle("Here's a list of all of my commands")
            commands.map(command => command).forEach(com => {
                if(!com.description) com.description = '\u200b';
                if(com.ownerOnly) return;
                embed.addField(`${com.name}`,`${com.description}`, true);
            })
            return message.channel.send(embed);
        }

        //Specific command help
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases.includes(name));

        if (!command){
            return message.reply('That\'s not a valid command!');
        }

        embed.setTitle(`Name: ${command.name}`);
        embed.addField(`Description`, `${command.description}`);
        message.channel.send(embed);

    },
};