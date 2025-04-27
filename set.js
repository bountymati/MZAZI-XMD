/* if you're using pannel carefully edit this part

There's no need to configure this if you're deploying via Heroku — just set them in the environment variables. And don't forget to rest, for even the relentless must recharge.*/

const sessionName = 'session';eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUtmSUh2YkFUL0xUa1l1RklqaTkweFk4d2hhWlA2NzVCd1JxZmhlL09HND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiLzVWa3VNbmdGZEJCNnk2K0xYVWZ2SUtmSGE3SmpBUWVHdCtvTWlCNVJRST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQnJtbVlrNWVaR1g2Ums5ZmczWVlpODFvUnJhY1Q4OFEzQjNWWVh3VDB3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzZXFNRThsZmo0TUhTOGM0QjFhWnROUkU5NDdNL0pPWFFmam9tQ2hVUkFBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldOTHRqKzRKemNINWlDRktWSDFBVk5hd1pqODhwckdmS1o1b2RLQXpMSFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inl2dExWa2djM210aUtqVURJSjk2SUlHRWlqb0V1NFp2RVUyL2tyTDRDd2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1BLR2VzaG9VZytNMDZzRU9mM05obUJCSCtsZno0Qk9WeGEwYlYwdzZHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT284dU9LSXZsYzg2OFozUGF0UUFqU1h3aEJkMkdyTXR3eTFVWmFxelUyRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikxmd1lSSlRyb3ZUTDQ0MVlVYmNLRmQxR01MYUltK1VkZGZWZHpQZitoS2hlZVBjc0VtQjhxN3dnempaRVBrZWlDU0tDMzBNRWZlZ1V3L2E2a3U5Y0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJHZERnRkNmRy9JL1ZVbzhBd01EaExRYVgrd2RuaHByQmwwT1cxQjFSSHo0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZVWVNc2NjZ1F5ZWhQbEZwY1VianFnIiwicGhvbmVJZCI6IjE3ZjcyYWNlLTY5Y2YtNDA3MC04NDcyLWY4NjU2ZjgwYmMzYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5R3BYVnZkTG96MEpkY3N1L1llZXN1NnlmRnM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN2p0ME56N3lOZWJSZyt1YjhyNisxTU5JUEtBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkI1NVo2ODVSIiwibWUiOnsiaWQiOiIyNTQ3NzQxMjU1ODM6MTJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiI2NoaXppIE1jdXRlIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPSHRpQ2NRNXZmR3Z3WVlBeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJJSFhycXJnTDBUWElTMFFNUmZjdE9GSGZUS2pGT0tPT2UwdGZMSWVXSWpNPSIsImFjY291bnRTaWduYXR1cmUiOiJSR0c1QUFaanY3Q2Y3aE00Ti81RlRJSGE1alZ3Ty9pWmw3dlAwVUMzSGRva2lpZFFqYTI0RTFRT3NjNWMvWEdLRnBnYUZCV25RZ3g3WDdDNUdLRFlBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZGZPUkljSEVoNmJVMG1waitoZVArTUJ1Tmw0TFBHRTU4VEZYZ3NwbWlid2pRZ0p5S1NzbFAzZGM4Rk81SXRndUw0d2dMQUxSY0w1MlJidXFZMWNPQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NzQxMjU1ODM6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU0IxNjZxNEM5RTF5RXRFREVYM0xUaFIzMHlveFRpampudExYeXlIbGlJeiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0Mzg5NTUzOX0=254 774 125583
const session = process.env.SESSION || '';
const autobio = process.env.AUTOBIO || 'FALSE';
const autolike = process.env.AUTOLIKE_STATUS || 'TRUE';
const autoviewstatus = process.env.AUTOVIEW_STATUS || 'TRUE';
const welcomegoodbye = process.env.WELCOMEGOODBYE || 'FALSE';

const prefix = process.env.PREFIX || '/';
const appname = process.env.APP_NAME || '';
const herokuapi = process.env.HEROKU_API;
const gptdm = process.env.GPT_INBOX || 'FALSE';
const mode = process.env.MODE || 'PUBLIC';

const botname = process.env.BOTNAME || '𝗠𝗭𝗔𝗭𝗜-𝗫𝗠𝗗';
const antibot = process.env.ANTIBOT || 'FALSE';
const author = process.env.STICKER_AUTHOR ||'𝗕𝗢𝗧';
const packname = process.env.STICKER_PACKNAME || '𝗠𝗭𝗔𝗭𝗜';
const dev = process.env.DEV || '254741388986';

const menu = process.env.MENU_TYPE || 'VIDEO';
const DevMzazi = dev.split(",");
const badwordkick = process.env.BAD_WORD_KICK || 'FALSE';
const bad = process.env.BAD_WORD || 'fuck';
const autoread = process.env.AUTOREAD || 'FALSE';

const admin = process.env.ADMIN_MSG || '𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗿𝗲𝘀𝗲𝗿𝘃𝗲𝗱 𝗳𝗼𝗿 𝗔𝗱𝗺𝗶𝗻𝘀!';
const group = process.env.GROUP_ONLY_MSG || '𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗺𝗲𝗮𝗻𝘁 𝗳𝗼𝗿 𝗚𝗿𝗼𝘂𝗽𝘀!';
const botAdmin = process.env.BOT_ADMIN_MSG || '𝗜 𝗻𝗲𝗲𝗱 𝗔𝗱𝗺𝗶𝗻 𝗽𝗿𝗲𝘃𝗶𝗹𝗲𝗱𝗴𝗲𝘀!';
const NotOwner = process.env.NOT_OWNER_MSG || '𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗺𝗲𝗮𝗻𝘁 𝗳𝗼𝗿 𝘁𝗵𝗲 𝗼𝘄𝗻𝗲𝗿!';

const wapresence = process.env.WA_PRESENCE || 'recording';
const antilink = process.env.ANTILINK || 'TRUE';
const mycode = process.env.CODE || '254';
const port = process.env.PORT || 10000;
const antilinkall = process.env.ANTILINK_ALL || 'TRUE';

module.exports = {254788685848
  session,
  sessionName,
  autobio,
  author,
  packname,
  dev,
  DevMzazi,
  badwordkick,
  bad,
  mode,
  group,
  NotOwner,
  botname,
  botAdmin,
  menu,
  autoread,
  antilink,
  admin,
  mycode,
  antilinkall,
  wapresence,
  welcomegoodbye,
  antibot,
  herokuapi,
  prefix,
  port,
  gptdm,
  appname,
  autolike,
  autoviewstatus,
};
  
