module.exports = {
    name:"russian_roulette",
    guildOnly:true,
    description: 'Russian Roulette, 1/6 chance to die',
    execute(message, args){
        let random = Math.floor(Math.random()*6);
        if(random === 1) message.member.kick().then(member => message.channel.send(`${member} has lost...`));
        else message.channel.send('The gods have granted mercy on your soul.');
    }
}