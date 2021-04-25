require("dotenv").config();
const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "D&D!";
const fs = require("fs");

try {
    if(fs.existsSync('data.json')) {
        console.log("The file exists.");
    } else {
        fs.writeFile('data.json', '{}', function (err) {
			if (err) return console.log(err);
		});
    }
} catch (err) {
    console.error(err);
}

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
    var parseData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    if (!parseData.hasOwnProperty(message.author.id)) {
    	parseData[message.author.id] = {
    		"characters": {
    			0:null
    		}
    	};
    	const data = JSON.stringify(parseData);
		fs.writeFile('data.json', data, 'utf8', (err) => {
		    if (err) {
		        console.log(`Error writing file: ${err}`);
		    } else {
		        console.log(`File is written successfully!`);
		    }
		});
    }
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
	}else if (commandName === "new") {
		if (args[0] === "character") {
			const filter = (n) => n.author.id === message.author.id;
			const Race = ["dwarf", "elf", "halfing", "human", "dragonborn", "gnome", "half-elf", "half-orc", "tiefing"];
			var CharacterData = {
				race:null,
				age:null,
				strength:null,
				intelligence:null,
				wisdom:null,
				constitution:null,
				dexterity:null,
				charisma:null,
				money:null,
			};
			const Embed = {
				color: '#00ff00',
				title: `What race are you you can be any of \n${Race.join(", ")}`,
				url: "",
				author: {
					Name: '',
					icon_url: "",
					url: '',
				},
				description: ``,
				thumbnail: "",
				fields: [],
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
			message.channel.awaitMessages(filter, {
				max: 1,
				time: 60000,
				errors: ['Line']
			})
			.then((collected) => {
				const msg = collected.first().content.toLowerCase();
				if (Race.indexOf(msg) > -1) {
					CharacterData.race = Race[Race.indexOf(msg)];
					const age = ["young", "middle age", "old"];
					const Embed = {
						color: '#00ff00',
						title: `How old are you? You can be any of \n${age.join(", ")}`,
						url: "",
						author: {
							Name: '',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [],
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
					message.channel.awaitMessages(filter, {
						max: 1,
						time: 60000,
						errors: ['Line']
					})
					.then((collected) => {
						const msg = collected.first().content.toLowerCase();
						if (age.indexOf(msg) > -1) {
							CharacterData.age = age[age.indexOf(msg)];
							var parseData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
						    console.log(parseData[message.author.id]);
						    parseData[message.author.id].characters[0] = CharacterData;
						    const data = JSON.stringify(parseData);
							fs.writeFile('data.json', data, 'utf8', (err) => {
							    if (err) {
							        console.log(`Error writing file: ${err}`);
							    } else {
							        console.log(`File is written successfully!`);
							    }
							});
						}else {
							const Embed = {
								color: '#00ff00',
								title: `Sorry that was not one of the options`,
								url: "",
								author: {
									Name: '',
									icon_url: "",
									url: '',
								},
								description: ``,
								thumbnail: "",
								fields: [],
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
					.catch((err) => {
						console.log(err);
						const Embed = {
							color: '#00ff00',
							title: `You know you have to respond right?`,
							url: "",
							author: {
								Name: '',
								icon_url: "",
								url: '',
							},
							description: ``,
							thumbnail: "",
							fields: [],
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
					});
				}else {
					const Embed = {
						color: '#00ff00',
						title: `Sorry that was not one of the options`,
						url: "",
						author: {
							Name: '',
							icon_url: "",
							url: '',
						},
						description: ``,
						thumbnail: "",
						fields: [],
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
			.catch((err) => {
				const Embed = {
					color: '#00ff00',
					title: `You know you have to respond right?`,
					url: "",
					author: {
						Name: '',
						icon_url: "",
						url: '',
					},
					description: ``,
					thumbnail: "",
					fields: [],
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
			});
		}
	}
})

function dice() {
	return Math.round(Math.random() * 6);
}

client.login(process.env.Token);