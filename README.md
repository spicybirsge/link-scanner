### Link Scanner

- Link Scanner is an advanced antiphishing discord bot that protects your server from phishing links.

### Information

1. Database: mongodb.
2. Antiscam api: https://anti-fish.bitflow.dev/
3. Library: discord.js

### Environment Variables

1. `token=your discord bot token`
2. `secret=your mongodb URI`

### Notes

1. The bot runs with a sharder, you can run it without the sharder but some commands might not work.
2. Please read the [license](https://github.com/spicybirsge/link-scanner/blob/main/LICENSE) and follow it before using this code.
3. For you to have access to the eval command, please edit [this line](https://github.com/spicybirsge/link-scanner/blob/main/commands/util/eval.js#L12) to your ID.

### How to selfhost?

1. Make sure to add the environment variables as mentioned.
2. After your downloaded this src, open your terminal and changed the directory to your src directory (cd "your directory")
3. Run `npm install`
4. Run `node shard.js`
