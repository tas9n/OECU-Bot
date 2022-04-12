const DEBUG = false;//true;

// imports
const { IntegrationExpireBehavior } = require('discord-api-types/v10');
const { Client, Intents, Permissions, Message, Role } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

// ピンをアクティビティに表示
client.once('ready', () => {
    console.log(`Ready on ${client.user.tag}`);

    const setActivity = () => {
        client.user.setActivity({
            name: `${client.ws.ping}ms で稼働中... ${(DEBUG ? '(デバッグモード)' : '')}`
        });
    };

    setActivity();
    setInterval(() => {
        setActivity();
    }, 5000);
});

// 参加時役職付与
client.on("guildMemberAdd", async member => {
    member.roles.add('962372777447424070');
});

// コマンド関連
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

    if (commandName == 'exit') {
        if (DEBUG) {
            if (interaction.member.permissions.has('ADMINISTRATOR')) {
                await interaction.reply('終了!');
                process.exit();
            } else {
                await interaction.reply('このコマンドを実行する権限がありません。');
            }
        } else {
            await interaction.reply('このコマンドはDEBUGモードのみ使用できます。');
        }
    }
});

// ログイン
client.login(token);