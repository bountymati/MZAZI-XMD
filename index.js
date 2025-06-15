/*
  MZAZI-XMD: WhatsApp Bot Starter
  Created with ❤️ by Nick_hunter9
*/

const {
  default: mzaziConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  downloadContentFromMessage,
  jidDecode,
  proto,
  getContentType,
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const axios = require("axios");
const pino = require("pino");
const express = require("express");
const chalk = require("chalk");
const figlet = require("figlet");
const FileType = require("file-type");
const PhoneNumber = require("awesome-phonenumber");
const _ = require("lodash");

// Project Files
const event = require("./action/events");
const auth = require("./action/auth");
const {
  imageToWebp, videoToWebp, writeExifImg, writeExifVid
} = require("./lib/mzaziexif");
const {
  smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia,
  fetchJson, sleep
} = require("./lib/mzazifunc");
const {
  sessionName, session, autobio, autolike, port, packname, autoviewstatus
} = require("./set.js");

// Color console output
const color = (text, clr) => clr ? chalk.keyword(clr)(text) : chalk.green(text);

// Express setup
const app = express();
app.use(express.static("pixel"));
app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

// Main bot function
async function startMzazi() {
  await auth(); // Authentication script
  const { state, saveCreds } = await useMultiFileAuthState("session");
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.log(color(figlet.textSync("MZAZI", { font: "Standard" }), "green"));
  console.log(`Using WA v${version.join(".")} - Latest: ${isLatest}`);

  const client = mzaziConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    browser: ["MZAZI-XMD", "Safari", "5.1.7"],
    auth: state,
    syncFullHistory: true,
  });

  // Auto status update
  if (autobio === 'TRUE') {
    setInterval(() => {
      const date = new Date();
      client.updateProfileStatus(
        `${date.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })} It's a ${date.toLocaleString('en-US', { weekday: 'long', timeZone: 'Africa/Nairobi'})}.`
      );
    }, 10 * 1000);
  }

  // Message Handler
  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      let mek = chatUpdate.messages[0];
      if (!mek?.message) return;

      mek.message = mek.message.ephemeralMessage?.message || mek.message;

      if (autoviewstatus === 'TRUE' && mek.key?.remoteJid === "status@broadcast") {
        client.readMessages([mek.key]);
      }

      if (autolike === 'TRUE' && mek.key?.remoteJid === "status@broadcast") {
        const jid = await client.decodeJid(client.user.id);
        await client.sendMessage(mek.key.remoteJid, {
          react: { key: mek.key, text: '🎭' }
        }, {
          statusJidList: [mek.key.participant, jid]
        });
      }

      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;

      let m = smsg(client, mek, store);
      require("./mzazi")(client, m, chatUpdate, store);

    } catch (err) {
      console.error("Error in message handler:", err);
    }
  });

  // Connection updates and auto-reconnect
  client.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;

      const actions = {
        [DisconnectReason.badSession]: () => {
          console.error("Bad session. Delete and re-scan.");
          process.exit();
        },
        [DisconnectReason.connectionClosed]: () => reconnect("Connection closed.");
        [DisconnectReason.connectionLost]: () => reconnect("Connection lost.");
        [DisconnectReason.connectionReplaced]: () => {
          console.error("Session replaced. Restart required.");
          process.exit();
        },
        [DisconnectReason.loggedOut]: () => {
          console.error("Logged out. Delete session and re-scan.");
          process.exit();
        },
        [DisconnectReason.restartRequired]: () => reconnect("Restart required.");
        [DisconnectReason.timedOut]: () => reconnect("Timed out.");
        default: () => reconnect(`Unknown disconnect: ${reason}`);
      };

      const reconnect = (msg) => {
        console.log(color(msg, "yellow"));
        startMzazi();
      };

      (actions[reason] || actions.default)();
    }

    if (connection === "open") {
      await client.groupAcceptInvite("ErhgRpemSxKDWJunjNr3yw");
      console.log(color("MZAZI-XMD connected successfully!", "green"));
      console.log(color("Follow @Nick_hunter9 on Instagram", "red"));
      await client.sendMessage(client.user.id, {
        text: "Bot is online! Contact +254798956113 if you need help."
      });
    }
  });

  // Save session credentials
  client.ev.on("creds.update", saveCreds);

  // More listeners: contacts update, group participants, reactions, etc.
  client.ev.on("contacts.update", (update) => {
    update.forEach(contact => {
      const id = client.decodeJid(contact.id);
      if (store?.contacts) store.contacts[id] = { id, name: contact.notify };
    });
  });

  client.ev.on("group-participants.update", (m) => event(client, m));

  // Add your custom send functions, download handlers, and message utilities here (already well-written)

  return client;
}

// Start the bot
startMzazi();

// Hot reload support
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Reloading ${__filename}`));
  delete require.cache[file];
  require(file);
});
