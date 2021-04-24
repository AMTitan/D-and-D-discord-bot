require("dotenv").config();
const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "D&D!";

client.on('ready', () => {
	console.log(`${client.user.tag} bot is on`);
	client.user.setActivity(`${PREFIX}help`, { type: 'WATCHING' })
  		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  		.catch(console.error);
})

client.on('message', (message) => {
	if (message.author.bot === true) return;
	if (!message.content.toLowerCase().startsWith(PREFIX.toLowerCase())) return;
	if (message.guild && !message.guild.me.permissionsIn(message.channel.id).any("SEND_MESSAGES")) return;
	console.log(`[${new Date}]: ${message.content}`);
	const [commandName, ...args] = message.content.toLowerCase()
		.trim()
		.substring(PREFIX.length)
		.split(/\s+/);
	if (commandName === `help`) {
		const Embed = {
			color: '#00ff00',
			title: `Help`,
			url: "",
			author: {
				Name: 'D&D',
				icon_url: "",
				url: '',
			},
			description: ``,
			thumbnail: "",
			fields: [{
				name: `${PREFIX}help`,
				value: "shows the help"
			},],
			image: {
				url: ""
			},
			fimestamp: new Date(),
			footer: {
				test: '',
				icon_url: "",
			},
		}

		message.channel.send({
			embed: Embed
		});
	}
})

client.login(process.env.Token);