////////////////////////////////////
//////  HORLOGE POUR DISCORD  //////
/////////// PAR # BASILE ///////////
////////////////////////////////////
// Mise à jour du 29/12/2024
require('dotenv').config();

const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const schedule = require('node-schedule');
const { spawn } = require('child_process');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

let language = 'FR'; // Langue par défaut

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);

    // Définir les commandes /horloge, /vider-salon et /restart
    const rest = new REST({ version: '10' }).setToken(TOKEN);

    (async() => {
        try {
            console.log('Début du refresh des commandes d\'application.');

            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
                    body: [{
                            name: 'langue',
                            description: 'Change la langue de l\'horloge',
                            options: [{
                                type: 3,
                                name: 'langue',
                                description: 'Langue à utiliser (EN ou FR)',
                                required: true
                            }]
                        },
                        {
                            name: 'vider-salon',
                            description: 'Supprime tous les messages de l\'horloge dans le canal spécifié'
                        },
                        {
                            name: 'restart',
                            description: 'Redémarre le bot'
                        }
                    ]
                },
            );

            console.log('Les commandes d\'application ont été rafraîchies.');
        } catch (error) {
            console.error(error);
        }
    })();

    // Planifier une tâche qui s'exécute toutes les minutes
    schedule.scheduleJob('* * * * *', () => {
        const channel = client.channels.cache.get(CHANNEL_ID);
        if (channel) {
            const now = new Date();
            let timeString = now.toLocaleTimeString();
            let message = language === 'EN' ? `The current time is ${timeString}` : `Il est actuellement ${timeString}`;
            channel.send(message);
        } else {
            console.log('Canal non trouvé.');

        }
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'horloge') {
        const lang = options.getString('langue');
        if (lang === 'EN' || lang === 'FR') {
            language = lang;
            await interaction.reply(`Langue changée en ${language === 'EN' ? 'anglais' : 'français'}`);
        } else {
            await interaction.reply('Langue non supportée. Veuillez choisir "EN" ou "FR".');
        }
    } else if (commandName === 'vider-salon') {
        const channel = client.channels.cache.get(CHANNEL_ID);
        if (channel) {
            try {
                let messages = await channel.messages.fetch();
                messages = messages.filter(msg => msg.author.id === client.user.id);
                await channel.bulkDelete(messages);
                await interaction.reply('Tous les messages de l\'horloge ont été supprimés.');
            } catch (error) {
                console.error(error);
                await interaction.reply('Une erreur est survenue lors de la suppression des messages.');
            }
        } else {
            await interaction.reply('Canal non trouvé.');
        }
    } else if (commandName === 'restart') {
        await interaction.reply('Redémarrage du bot...');
        restartBot();
    }
});

function restartBot() {
    const child = spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: 'inherit'
    });
    child.unref();
    process.exit();
}

client.login(TOKEN);
client.login(TOKEN);
