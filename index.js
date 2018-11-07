const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	
	if(err) console.log(err);
	
	let jsfile = files.filter(f => f.split(".").pop() == "js")
	if(jsfile.length <= 0){
		console.log("Couldn't find commands.");
		return;
	}
	
	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
})
bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`)
	bot.user.setActivity("For those 'k's", {type:"WATCHING"});
});

bot.on("guildMemberAdd", member => {
	const channel = member.guild.channels.find(ch => ch.name == "welcome");
	
	if(!channel) return;
	
	channel.send(`Welcome ${member} Please take the time to read through the ${member.guild.channels.find(ch => ch.name == "rules-and-guide")} before anything else. Enjoy your stay!`);
	let twitchers = member.guild.roles.find(`name`, "Twitchers");
	let tubers = member.guild.roles.find(`name`, "Tubers");
	member.addRole(twitchers.id);
	member.addRole(tubers.id);
});

bot.on('message', async message => {
	console.log("#"+message.guild+"|"+message.member.nickname+":"+message.author+"=>"+message.content);
	if(message.author.bot) return;
	if(message.channel.type == 'dm') return;
	let prefix = botconfig.prefix;
	let messageArray = message.content.split(' ');
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	let logchannel = botconfig.logchannel;	
	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	
	if(commandfile) commandfile.run(bot,message,args);
	
	if(cmd == `${prefix}spam`){
		
	}
	
	if(cmd == `${prefix}kick`){
		
		return;
			
	}
	
	if(cmd == `${prefix}ban`){
		
	return;
			
	}
	
	if(cmd == `${prefix}report`){
		
		
		return;
	}
	
	
	
	if(cmd == `${prefix}botinfo`){
	
		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setDescription("Bot Information")
		.setColor("#05828f")
		.setThumbnail(bicon)
		.addField("Bot Name", bot.user.username)
		.addField("Created On", bot.user.createdAt);
		return message.channel.send(botembed);
	}
	
	if(cmd == `${prefix}serverinfo`){
		let sicon = message.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
		.setDescription("Server Information")
		.setColor("#05828f")
		.setThumbnail(sicon)
		.addField("Server Name", message.guild.name)
		.addField("Created On", message.guild.createdAt)
		.addField("Total Members", message.guild.memberCount);
		
		return message.channel.send(serverembed);
	}
	
	if(cmd == `k.` || cmd == `k` || cmd == `K.` || cmd == `K` || cmd == `kk`){
		if(message.author.id == `235486399875252224`){
			message.delete().catch(O_o => {});
		}
		else{
			message.delete().catch(O_o => {});
			return message.channel.send(cmd);
		}
	}
	if(cmd == `im`|| cmd == `I'm` || cmd == `Im` || cmd == `i'm` || cmd == `I` || cmd == `i`){
		if(cmd == `I` || cmd == `i`)
		{
			if(args[0] == "am" || args[0] == "Am"){
				if(args.length > 1){
					if(args[0] == `jeff`){
						return message.channel.send("jeff jeff jeff jeff");
					}
					let mesg = args.slice(2).join(" ");
					return message.channel.send(`Hello ${mesg}, I'm Dad`);
				}
			}	
		}
		else{
			if(args.length > 0){
				if(args[0] == `jeff`){
					return message.channel.send("jeff jeff jeff jeff");
				}
				let mesg = args.join(" ");
				return message.channel.send(`Hello ${mesg}, I'm Dad`);
			}
		}
	}
	
	if(message != null){
		for(let i = 0; i < args.length; i++){
			if(args[i] == `im`|| args[i] == `I'm` || args[i] == `Im` || args[i] == `i'm` || args[i] == `I` || args[i] == `i`){
				if(args[i] == `I` || args[i] == `i`)
				{
					if(args[i+1] == "am" || args[i+1] == "Am"){
						if(args.length > i+1){
							if(args[i+1] == `jeff`){
								return message.channel.send("jeff jeff jeff jeff");
							}
							let mesg = args.slice(i+2).join(" ");
							return message.channel.send(`Hello ${mesg}, I'm Dad`);
						}
					}	
				}
				else{
					if(args.length > i){
						if(args[i+1] == `jeff`){
							return message.channel.send("jeff jeff jeff jeff");
						}
						let mesg = args.slice(i+1).join(" ");
						return message.channel.send(`Hello ${mesg}, I'm Dad`);
					}
				}
			}
		}
	}
	
});


bot.login(botconfig.token);