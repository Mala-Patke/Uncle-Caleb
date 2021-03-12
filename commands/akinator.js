const { Message } = require('discord.js');
const akinator = require('../akinatordata/akinator.json');
const questions = require('../akinatordata/questions.json');

function parsequestion(type, val){
    return questions[type].split("%VAR%").join(val);
}

module.exports = {
    name: 'Akinator',
    guildOnly: true,
    description: "Under Construction",
    /*
        Step 1: Ask two of these three questions in any order: Goes to KLS, Ethnicity, Gender, hair_data
        Step 2: Select random enjoy from the database. 
        Step 3: Narrow Down with uniques 
    */
    /**
     * @param {Message} message 
     */
    execute(message){
        if(message.author.id !== '674140360079048714') return message.channel.send('Command is currently not ready for use.');
    }
}