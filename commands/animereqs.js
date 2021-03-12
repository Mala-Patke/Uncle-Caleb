const { Message } = require('discord.js');

module.exports = {
    name: 'anime',
    guildOnly: false,
    description: "I like anime",
    /**
     * 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    execute(message, args){
        
        message.channel.send(`Actually good animes: Guilty Crown, Steins Gate, (i'll put it) bnha, relife, golden time (eh), Kokoro connect (eh), Classroom of the Elite, Hinamatsuri, Daily Lives of High School Boys, Hunter x Hunter, Death Note, Zutto Mae Kara Suki Deshita (The three series is nice), Psycho - Pass, Mirai Nikki (eh), Mob Psycho, the entire Fate/Stay night series, Bunguo Stray Dogs, Maid Sama, A certain magical index series (eh), Akame ga Kill, Seven Deadly Sins, Noragami, High School Dxd ("plot"), Kill la Kill, Inuyashiki, Orange, Darwins Game, Masamune's Revenge, Prison School, project k, Golden Boy, Ookami Shoujo to Kuro Ouji, Kiznaiver, Hamatora`)
    }
}