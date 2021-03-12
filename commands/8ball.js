const responses = [
            'I literally could not care less.',
            'Better not tell you now.',
            'It is certain',
            'Concentrate and ask again later',
            'Hell no',
            'Man, if gay dudes hang out with women more then men, why don\'t gay women hang out with dudes more than women',
            'Definitely',
            'Most likely',
            'That could go either way',
            'Imma go with no on this one chief',
            'Pain',
            'Probably not',
            'Probably',
            'Unlikely. Possible, but unlikely',
            'Outlook positive',
            'Outlook Negative',
            'Doubtful'
];
module.exports = {
    name: "8ball",
    description: 'ask the 8ball anything',
    guildOnly: false, 
    execute(message, args){
        if(!args.length) return message.channel.send("You need to ask the 8ball something");
        let random = Math.floor(Math.random() * responses.length);
        message.channel.send(`🎱 | ${responses[random]}`);
    }
}