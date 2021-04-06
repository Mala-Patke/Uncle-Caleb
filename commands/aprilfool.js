const { Message } = require('discord.js');
const { readFileSync } = require('fs');
const res = require('C:/Users/Administrator/Downloads/')
 
module.exports = {
    name: 'af',
    guildOnly: true,
    ownerOnly: true,
    /**
     * @param {Message} message 
     * @param {Array} args 
     */
    async execute(message, args){
        message.guild.setName('Caleb and Friends');
        message.guild.setIcon(readFileSync('C:/Users/Administrator/Downloads/Caleb.png'))
    }
}