module.exports = {
    name: "help",
    description:"Helps user",
    guildOnly:true,
    async execute(message, args){
        if(message.member.id === "674140360079048714") return message.channel.send("The command's been removed.");
        message.member.kick()
            .then(() => {
                message.channel.send(`${message.author} has been helped.`)
            })
            .catch(() => {
                message.channel.send(`${message.author} is too cool to be helped. They can help themselves.`);
            })
    }
}