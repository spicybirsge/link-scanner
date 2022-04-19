const client = require('../index')
client.mute = async(message, reason) => {
    const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");
    if(!role) {
        throw `No role called "muted" found.`
        
    }
    if(!message.guild.me.permissions.has("MANAGE_ROLES")) {
        throw `Cannot execute action 'mute' without ManageRoles permission.`

    }
    if(message.guild.me.roles.highest.position < role.position) {
        throw `Cannot execute action 'mute' while mute role is higher than my highest role.`
        
    }
    message.member.roles.add(role, reason)
};