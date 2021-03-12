const copypasta = "Help is available\nSpeak with a counselor today\nNational Suicide Prevention Lifeline\n1-800-273-8255";

module.exports = {
    name: 'kms',
    description: 'Sends the suicide hotline copypasta',
    execute(message, args) {
        message.delete().catch(console.error);
        message.channel.send(copypasta);
    },
};
