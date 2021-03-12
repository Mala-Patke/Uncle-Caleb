const { get } = require('axios').default;

module.exports = {
    name: "crown", 
    guildOnly: true,
    description: 'Uses MEE6 levels to determine who is the "crown" of the server',
    /**
     * @param {import('discord.js').Message} message 
     */
    async execute(message, args){
        let crown = message.guild.roles.cache.find(r => r.name === "the crown");
        if(!crown) crown = await message.guild.roles.create({ data: {
            name: 'the crown',
            color: 'YELLOW'
        }}).catch(() => { })
        get(`https://mee6.xyz/api/plugins/levels/leaderboard/${message.guild.id}`)
            .then(res => res.data)
            .then(data => {
                if (data.players[0].username === message.author.username){
                    message.guild.members.cache.each(mem => {
                        let hasRole = mem.roles.cache.has(crown.id)
                        if(hasRole){
                            if(mem === message.member) return message.channel.send("You already have the crown.")
                            else{
                                mem.roles.remove(crown)
                                message.channel.send(`${mem} has been uncrowned!`);
                            }
                        }         
                    })
                    message.member.roles.add(crown)
                    message.channel.send(`${message.member} has been crowned!`);
                } else {
                    message.member.kick()
                        .then(() => {
                            message.channel.send("You are not the crown. You shall be punished for attempting to take it.");
                        })
                        .catch(() => {
                            message.channel.send("You are not the crown but there's nothing I can do about it.");
                        })
                }
            });
    }
}