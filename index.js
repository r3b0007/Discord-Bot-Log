const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');  // ملف الكونفق 
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// دخول عضو 
client.on('guildMemberAdd', member => {
    const embed = new EmbedBuilder()
        .setTitle('Member Joined')
        .setColor('#57F287')
        .setDescription(`${member.user.tag} has joined the server.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.guildMemberAdd);
});
// مغادرة عصو لسيرفر
client.on('guildMemberRemove', member => {
    const embed = new EmbedBuilder()
        .setTitle('Member Left')
        .setColor('#ED4245')
        .setDescription(`${member.user.tag} has left the server.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.guildMemberRemove);
});
// رسالة جديدة
client.on('messageCreate', message => {
    if (message.author.bot) return;

    const embed = new EmbedBuilder()
        .setTitle('Message Sent')
        .setColor('#3498DB')
        .setDescription(`**${message.author.toString()}**:\n\`\`\`fix\n${message.content}\n\`\`\``)
        .setTimestamp();

    sendLog(embed, config.logChannels.messageCreate);
});

// تعديل الرسالة 
client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;

    const embed = new EmbedBuilder()
        .setTitle('Message Edited')
        .setColor('#E67E22')
        .setDescription(`**${oldMessage.author.toString()}** edited a message:\n\n**Before:**\n\`\`\`fix\n${oldMessage.content}\n\`\`\`\n**After:**\n\`\`\`fix\n${newMessage.content}\n\`\`\``)
        .setTimestamp();

    sendLog(embed, config.logChannels.messageUpdate);
});

// حذف رسالة 
client.on('messageDelete', message => {
    if (message.author.bot) return;

    const embed = new EmbedBuilder()
        .setTitle('Message Deleted')
        .setColor('#992D22')
        .setDescription(`**${message.author.toString()}** deleted a message:\n\n\`\`\`fix\n${message.content}\n\`\`\``)
        .setTimestamp();

    sendLog(embed, config.logChannels.messageDelete);
});


// انشاء رول جديد
client.on('roleCreate', async role => {
    const fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: 'ROLE_CREATE',
    });

    const roleLog = fetchedLogs.entries.first();
    const { executor } = roleLog;

    const embed = new EmbedBuilder()
        .setTitle('Role Created')
        .setColor('#57F287')
        .setDescription(`Role ${role} has been created by <@${executor.id}>.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.roleCreate);
});

// تحديث رول 
client.on('roleUpdate', (oldRole, newRole) => {
    const embed = new EmbedBuilder()
        .setTitle('Role Updated')
        .setColor('#E67E22')
        .setDescription(`Role **${oldRole.name}** has been updated to **${newRole.name}**.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.roleUpdate);
});
// حذف رول 
client.on('roleDelete', role => {
    const embed = new EmbedBuilder()
        .setTitle('Role Deleted')
        .setColor('#ED4245')
        .setDescription(`Role **${role.name}** has been deleted.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.roleDelete);
});
// انشاء روم 
client.on('channelCreate', channel => {
    const embed = new EmbedBuilder()
        .setTitle('Channel Created')
        .setColor('#57F287')
        .setDescription(`Channel **${channel.name}** has been created.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.channelCreate);
});
// تحديث روم 
client.on('channelUpdate', (oldChannel, newChannel) => {
    const embed = new EmbedBuilder()
        .setTitle('Channel Updated')
        .setColor('#E67E22')
        .setDescription(`Channel **${oldChannel.name}** has been updated to **${newChannel.name}**.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.channelUpdate);
});
// حذف روم 
client.on('channelDelete', channel => {
    const embed = new EmbedBuilder()
        .setTitle('Channel Deleted')
        .setColor('#ED4245')
        .setDescription(`Channel **${channel.name}** has been deleted.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.channelDelete);
});
// الباند
client.on('guildBanAdd', (guild, user) => {
    const embed = new EmbedBuilder()
        .setTitle('User Banned')
        .setColor('#992D22')
        .setDescription(`User **${user.toString()}** has been banned from the server.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.guildBanAdd);
});
// فك الباند
client.on('guildBanRemove', (guild, user) => {
    const embed = new EmbedBuilder()
        .setTitle('User Unbanned')
        .setColor('#57F287')
        .setDescription(`User **${user.toString()}** has been unbanned from the server.`)
        .setTimestamp();

    sendLog(embed, config.logChannels.guildBanRemove);
});
// اسم مستعار + اضافة رول + حذف رول 
client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (oldMember.nickname !== newMember.nickname) {
        const embed = new EmbedBuilder()
            .setTitle('Nickname Changed')
            .setColor('#3498DB')
            .setDescription(`User **${oldMember.user.toString()}** changed nickname from **${oldMember.nickname || oldMember.user.username}** to **${newMember.nickname || newMember.user.username}**.`)
            .setTimestamp();

        sendLog(embed, config.logChannels.guildMemberUpdate);
    }

    if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

        if (addedRoles.size > 0) {
            const embed = new EmbedBuilder()
                .setTitle('Role Added')
                .setColor('#57F287')
                .setDescription(`User **${newMember.user.toString()}** was given role **${addedRoles.map(role => role.name).join(', ')}**.`)
                .setTimestamp();

            sendLog(embed, config.logChannels.guildMemberUpdate);
        }

        if (removedRoles.size > 0) {
            const embed = new EmbedBuilder()
                .setTitle('Role Removed')
                .setColor('#ED4245')
                .setDescription(`User **${newMember.user.toString()}** had role **${removedRoles.map(role => role.name).join(', ')}** removed.`)
                .setTimestamp();

            sendLog(embed, config.logChannels.guildMemberUpdate);
        }
    }
});
// نقل عضو الي روم اخر
client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.channelId !== newState.channelId) {
        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Update')
            .setColor('#3498DB')
            .setDescription(`User **${newState.member.user.toString()}** moved from **${oldState.channel ? oldState.channel.name : 'None'}** to **${newState.channel ? newState.channel.name : 'None'}**.`)
            .setTimestamp();

        sendLog(embed, config.logChannels.voiceStateUpdate);
    }

    if (oldState.mute !== newState.mute || oldState.deaf !== newState.deaf) {
        const embed = new EmbedBuilder()
            .setTitle('Voice State Update')
            .setColor('#E67E22')
            .setDescription(`User **${newState.member.user.toString()}** ${newState.mute ? 'was muted' : 'was unmuted'}, ${newState.deaf ? 'was deafened' : 'was undeafened'}.`)
            .setTimestamp();

        sendLog(embed, config.logChannels.voiceStateUpdate);
    }
});

function sendLog(embed, channelId) {
    const logChannel = client.channels.cache.get(channelId);
    if (logChannel) {
        logChannel.send({ embeds: [embed] });
    } else {
        console.log('Log channel not found');
    }
}

client.login(config.token);
