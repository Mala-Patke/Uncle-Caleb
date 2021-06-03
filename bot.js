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
    client.nickname = null;
    await client.user.setPresence({ activity: {name: 'Spotify', type:'LISTENING'}, status:'dnd' })
    console.clear();
    console.log('Uncle Caleb\'s here!');
});

let coolpeoplearray = [
    "674140360079048714",
    "294625075934527495",
    "748365310171807775",
    "430583627173330955"
]

client.on('message', async message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    let args = message.content.slice(config.prefix.length).split(/ +/);
    let commandName = args.shift().toLowerCase();

    if(!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);
    
    if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');
    if (command.ownerOnly && !coolpeoplearray.includes(message.author.id)) return message.delete();
    try {
        command.execute(message, args);
    } catch (error){
        console.error(error);
        message.reply('There was an error trying to execute that command.');
    }
});

client.on('message', message => {
    if(message.author.id === client.user.id) return;
    if(message.content.includes('||')) return;
    let splitmessage = message.content.split(" ")
    if(message.channel.id === "690801248143671299" && message.author.id === "674140360079048714" && client.pingknk) return message.channel.send(`<@636800795529969697>`).then(m => m.delete())
    if(message.channel.id === '766897690952728626') return message.react(`796615553003028490`);

    if(message.content.endsWith("This can be bypassed if you're an admin (either Manage Server or Administrator) or you're alone with the bot."))
        return message.channel.send('To obtain the DJ role, run `;role DJ`. It won\'t ban you I swear.')

    let dadex = message.content.replace('_', ' ').match(/\b[i1]['`]?( [a4])?m\b/gi);
    if(dadex){
        if (Math.floor(Math.random() * 250) == 12) return;
        let daddedmessage = splitmessage.slice(splitmessage.findIndex(a => dadex.includes(a) || a === "am")+1).join(" ")
        if(!daddedmessage.length) return;
        message.channel.send(`Hi ${daddedmessage}, I'm Uncle Caleb!`)
    }
});

client.on('guildMemberUpdate', member => {
    if(member.id === '499481332007698432' && member.nickname !== client.nickname){
        client.guilds.cache.get('506672768792657933').members.cache.get(client.user.id).setNickname(member.nickname)
        client.nickname = member.nickname;
    }
});

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.partial){
        try {
            await reaction.fetch()
        }catch(error) {
            console.log('Something went wrong with fetching a reaction: ', error);
            return;
        }
    }
    
    if(reaction.message.partial){
        try {
            await reaction.message.fetch()
        } catch(error) {
            console.log('Something went wrong with fetching a reaction\'s message', error);
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
            return console.error(`Something went wrong with fetching a deleted message: ${err}`);
        }
    }

    if(message.content.endsWith("I'm Uncle Caleb!") && message.author.id === client.user.id) 
        return message.channel.send(message.content)

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
.on('rateLimit', err => console.error(err + "RATELIMIT"))
.on('error', err => console.error(err + "ERROR"))
.on('warn', err => console.warn(err + "WARN"));

client.login(config.token);