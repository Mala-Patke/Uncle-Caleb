const axios = require('axios').default;

module.exports = {
    name:"roulette",
    description: "Spin the wheel of luck!",
    guildOnly:true,
    execute(message, args){
        let responses = new Map();
        responses.set(99, () => {
            message.channel.send("There is a 1% chance of this happening");
        })
        responses.set(80, async () => {
            let catfact = (await axios('https://catfact.ninja/fact')).data;
            message.channel.send(`Here's a fun fact about cats: ${catfact.fact}`);
        })
        responses.set(70, () => {
            message.channel.send("You get nothing, you lose");
        })
        responses.set(50, () => {
            message.channel.send(`The time is ${Date.now()}`);
        })
        responses.set(17, async () => {
            let dadjoke = (await axios('https://icanhazdadjoke.com/')).data;
            message.channel.send(dadjoke.joke);
        })
        responses.set(1, () => {
            message.author.send('You\'ve lost.');
            if(message.author.id == '674140360079048714') return message.channel.send("Yeah, I'm not kicking you.")
            message.member.kick().catch(() => message.channel.send('I was going to kick you, but it appears as if I can\'t. Could you do me a favor and kick yourself?'));
        })

        let random = Math.floor(Math.random()*100);
        console.log(random);
        for(const [key, values] of responses){
            if(key <= random){
                let x = responses.get(key)
                x();
                break;
            }//End if
        }//End For
    }//End execute
}//End exports