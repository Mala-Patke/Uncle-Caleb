module.exports = {
    name: "unban",
    description:"Unbans a user from this guild",
    guildOnly:false,
    /**
     * @param {import('discord.js').Message} message 
     * @param {string[]}
     */
    async execute(message, args){
        message.client.guilds.cache.get(args[0]).members.unban(args[1]);
    }
}