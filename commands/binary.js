module.exports = {
	name: 'binary',
	description: 'Turns name into binary code',
	aliases: ['bin', 'bnry'],
	async run(client, message, args) {
		// Discord + Config
		const Discord = require('discord.js');
		const config = require('./command_config.json');
		// Too many characters error
		const tooManyCharacters = new Discord.MessageEmbed()
		.setTitle('<:error:761349813195112448> Error')
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setDescription(`Your message is too long! Try one of these tools:\nhttps://www.binarytranslator.com/\nhttps://www.convertbinary.com/to-text/\nhttps://www.qbit.it/lab/bintext.php`)
		.setColor('#ff0000')
		.setFooter('ConnorBot', config.icon)
		.setTimestamp();
		try {
		var newMessage = args.slice(0).join(' ');
	var binaryMessage = newMessage.replace(/[ ]/g, '00100000').replace(/[a]/g, '01100001').replace(/[b]/g, '01100010').replace(/[c]/g, '01100011').replace(/[d]/g, '01100100').replace(/[e]/g, '01100101').replace(/[f]/g, '01100110 ').replace(/[g]/g, '01100111').replace(/[h]/g, '01101000').replace(/[i]/g, '01101001').replace(/[j]/g, '01101010').replace(/[k]/g, '01101011').replace(/[l]/g, '01101100').replace(/[m]/g, '01101101').replace(/[n]/g, '01101110').replace(/[o]/g, '01101111').replace(/[p]/g, '01110000').replace(/[q]/g, '01110001').replace(/[r]/g, '01110010').replace(/[s]/g, '01110011').replace(/[t]/g, '01110100').replace(/[u]/g, '01110101').replace(/[v]/g, '01110110').replace(/[w]/g, '01110111').replace(/[x]/g, '01111000').replace(/[y]/g, '01111001').replace(/[z]/g, '01111010').replace(/[A]/g, '01000001').replace(/[B]/g, '01000010').replace(/[C]/g, '01000011').replace(/[D]/g, '01000100').replace(/[E]/g, '01000101').replace(/[F]/g, '01000110').replace(/[G]/g, '01000111').replace(/[H]/g, '01001000').replace(/[I]/g, '01001001').replace(/[J]/g, '01001010').replace(/[K]/g, '01001011').replace(/[L]/g, '01001100').replace(/[M]/g, '01001101').replace(/[N]/g, '01001110').replace(/[O]/g, '01001111').replace(/[P]/g, '01010000 ').replace(/[Q]/g, '01010001').replace(/[R]/g, '01010010').replace(/[S]/g, '01010011').replace(/[T]/g, '01010100').replace(/[U]/g, '01010101').replace(/[V]/g, '01010110').replace(/[W]/g, '01010111').replace(/[X]/g, '01011000').replace(/[Y]/g, '01011001').replace(/[Z]/g, '01011010').replace(/[!]/g, '00100001').replace(/[@]/g, '01000000').replace(/[#]/g, '00100011').replace(/[$]/g, '00100100').replace(/[%]/g, '00100101').replace(/[^]/g, '01011110').replace(/[&]/g, '00100110').replace(/[*]/g, '00101010').replace(/[(]/g, '00101000').replace(/[)]/g, '00101001 ').replace(/[-]/g, '00101101').replace(/[_]/g, '01011111').replace(/[=]/g, '00111101').replace(/[+]/g, '00101011').replace(/[~]/g, '01111110').replace(/[`]/g, '01100000').replace(/[\\]/g, '01011100').replace(/[|]/g, '01111100').replace(/[{]/g, '01111011').replace(/[}]/g, '01111101').replace(/[[]/g, '01011011').replace(/[\]]/g, '01011101').replace(/[:]/g, '00111010').replace(/[;]/g, '00111011').replace(/["]/g, '00100010').replace(/[']/g, '00100111').replace(/[,]/g, '00101100').replace(/[.]/g, '00101110').replace(/[<]/g, '00111100').replace(/[>]/g, '00111110').replace(/[?]/g, '00111111').replace(/[¡]/g, '10100001').replace(/[£]/g, '10100011').replace(/[¢]/g, '10100010').replace(/[∞]/g, '00011110').replace(/[¶]/g, '10110110').replace(/[•]/g, '00100010').replace(/[ª]/g, '10101010').replace(/[º]/g, '10111010').replace(/[–]/g, '00010011').replace(/[√]/g, '11100111').replace(/[≥]/g, '01100101').replace(/[≤]/g, '01100100').replace(/[§]/g, '10100111').replace(/[π]/g, '11000000').replace(/[∑]/g, '00010001');
	// Character check
	if (binaryMessage.length > 2048) {
		return message.channel.send(tooManyCharacters);
	} else {
		const binaryEmbed = new Discord.MessageEmbed()
		.setDescription(binaryMessage)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true, format: 'png', size: 1024}))
		.setColor(config.gold)
		.setFooter(config.name, config.icon)
		.setTimestamp();
		message.channel.send(binaryEmbed);
	}
		} catch (error) {
			console.error(error);
			message.reply(config.error);
		}
	}
}