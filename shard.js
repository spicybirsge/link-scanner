const { config } = require("dotenv").config();
const { ShardingManager} = require("discord.js")
const colors = require("colors")
const shards = new ShardingManager("./index.js" , {
  token : process.env.token,
  totalShards : 2,
  spawnTimeout: -1,
  respawn : true
})
shards.on("shardCreate" , async (shard) => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched Shard #${shard.id*1+1}`.bold.green)
 shards.on('error', (error) => {
     return
  })
})

shards.on("disconnect" , async (shard) => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Disconnected Shard #${shard.id*1+1}`.bold.red)
})

shards.on("death" , async (shard) => {
  shards.spawn(shards.totalShards , 10000);
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Killed Shard #${shard.id*1+1}`.bold.red)
})


/*shards.spawn(1, 1000, -1);*/
/*shards.spawn(shards.totalShards, -1);*/
shards.spawn(shards.totalShards, 10000, -1).catch(() => { return })