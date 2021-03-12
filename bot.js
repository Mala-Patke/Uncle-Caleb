const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config.json');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.pingknk = true;

client.once('ready', async() => {
    client.user.setPresence({ activity: {name: 'Spotify', type:'LISTENING'}, status:'dnd'})
    .then(console.log("Uncle Caleb's here."))
    .catch(console.error);
});

client.on('message', async message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    let args = message.content.slice(config.prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    
    if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');
    if (command.ownerOnly && message.author.id !== '674140360079048714') return message.delete();
    try {
        command.execute(message, args);
    } catch (error){
        console.error(error);
        message.reply('There was an error trying to execute that command.');
    }
});

client.on('message', message => {
    if(message.channel.id === "690801248143671299" && message.author.id === "674140360079048714" && client.pingknk) return message.channel.send(`<@636800795529969697>`).then(m => m.delete())
    if(message.channel.id === '766897690952728626') return message.react(`796615553003028490`);
    /**
    let args = message.content.split(/ +/);
    for(let i = 0; i < args.length-1; i++){
        if(args[i].toLowerCase() === "i" && args[i+1].toLowerCase() === "lost"){
            message.channel.send("It's been said");
        }
    }
    */
});

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.partial){
        try {
            await reaction.fetch()
        }catch(error) {
            console.log('Something went wrong: ', error);
            return;
        }
    }
    
    if(reaction.message.partial){
        try {
            await reaction.message.fetch()
        } catch(error) {
            console.log('Something went wrong: ', error);
            return;
        }
    }

    let channel = reaction.message.guild.channels.cache.find(ch => ch.name === 'thats-going-in-the-quote-book');

    if(reaction.count >= 4 && reaction.emoji.id == 690243750173475076){
      let fetch = await channel.messages.fetch({limit: 100});
      let dupCheck = fetch.find(m => {
        let ret;
        try{
          ret = m.embeds[0].footer.text === reaction.message.id;
        } catch {
          ret = null;
        }
        return ret;
      });
      if(!dupCheck) channel.send(new Discord.MessageEmbed()
      .setTitle(`"${reaction.message.content}"`)
      .addField("Said by", reaction.message.author, true)
      .addField("On", reaction.message.createdAt, true)
      .addField("In channel", reaction.message.channel, true)
      .addField("Message link", reaction.message.url, true)
      .setThumbnail("https://imgur.com/cNecthw.png")
      .setFooter(reaction.message.id));
    }

});

client.deleted = new Discord.Collection();

client.on('messageDelete', async message => {
    if(message.partial){
        try {
            await message.fetch();
        } catch(err) {
            console.log(`Something went wrong: ${err}`);
        }
    }

    if(message.attachments.size) message.hasAttatchments = true;
    else message.hasAttatchments = false;

    let deletedArray = client.deleted.get(message.channel.id) || [];
    deletedArray.unshift(message);
    if(deletedArray.length > 5) deletedArray.pop();
    client.deleted.set(message.channel.id, deletedArray);

    setTimeout(() => {
        let get = client.deleted.get(message.channel.id);
        get = get.filter(a => a !== message); 
        client.deleted.set(message.channel.id, get);
    }, 600000);
});

client
.on('rateLimit', err => console.error(err))
.on('error', err => console.error(err))
.on('warn', err => console.warn(err));

client.login(config.token);
