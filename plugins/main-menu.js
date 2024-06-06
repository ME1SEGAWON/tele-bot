//import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'
import { setTimeout } from 'timers'
//import { plugins } from '../lib/plugins.js'
let tags = {
  'main': 'MAIN MENU',
  'game': 'GAME',
  'econ': 'LEVEL & EKONOMI',
  'rg': 'REGISTER',
  'sticker': 'STICKER',
  'img': 'IMAGE',
  'maker': 'MAKER',
  'prem': 'PREMIUM',
  'group': 'GROUP',
  'nable': 'EN/DISABLE FITUR', 
  'nime': 'ANIME',
  'rnime': 'ANIME REACCION',
  'dl': 'DOWNLOADER',
  'tools': 'TOOLS',
  'fun': 'FUN',
  'cmd': 'DATABASE',
  'nsfw': 'NSFW +18', 
  'ansfw': 'NSFW ANIME',
  'owner': 'OWNER', 
  'advanced': 'ADVANCED',
}
const defaultMenu = {
  before: `
◈ ━━━━━ *ɃȺĐ ȺⱣⱣŁɆ x MINIWONᴮᴼᵀ* ━━━━━ ◈
 
👋🏻 Halo *%name*
🧿 Level : *%level* 
👥 User : %totalreg
📈 Up Time : %muptime
─────────────
⟦LINK GROUP⟧
• https://chat.whatsapp.com/CtrfJ1eEzVEEf1jXkg3UvJ
▢ WEBSITE BOT *SEGAWON*
• https://miniwon.online
─────────────
%readmore
Ⓟ = Premium
ⓓ = Limit
-----  -----  -----  -----  -----
  ≡ *List Menu*
`.trimStart(),
  header: '┌─⊷ *%category*',
  body: '▢ %cmd %isdiamond %isPremium',
  footer: '└───────────\n',
  after: `
`,
}
let loadd = [
  'MINIWON',
  'ɃȺĐ ȺⱣⱣŁɆ x MINIWON',
]
let apple = `ɃȺĐ ȺⱣⱣŁɆ x MINIWON`
let ownerinfo = `CUSTOMER SERVICE :

https://wa.me/6287818311678 (Customer Service)

https://wa.me/6285641463294 (Owner Bot)

Request Fitur/Lapor Bug Chat Owner/Customer Service
Dijamin Fast Respon Jika Chat Owner, Harap Dimohon Jika Chat Owner Yang Sopan Dan Jika Ada Perlu Saja`
 let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
 
 //await conn.sendMessage(m.chat, {delete: key})
 //await conn.sendMessage(m.chat, {text: apple}, {quoted: m})
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, diamond, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        diamond: plugin.diamond,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `Powered by https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, diamond, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let pp = './src/fg_logo.jpg'
    let { key } = await conn.sendMessage(m.chat, {text: 'Loading...'})
 
 for (let i = 0; i < loadd.length; i++) {
    await conn.sendMessage(m.chat, {text: loadd[i], edit: key }, {quoted: m})}
    //conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m, null)
    const groupId = '120363024562395590@g.us'; // ID grup yang spesifik
    const groupMetadata = await conn.groupMetadata(groupId);
    const participants = groupMetadata.participants;
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);

    if (!users.includes(m.sender)) {
      await conn.sendMessage(m.chat, { text: '*Anda harus bergabung dengan grup terlebih dahulu untuk menggunakan bot miniwon*\n\nLINK: https://chat.whatsapp.com/CtrfJ1eEzVEEf1jXkg3UvJ', edit: key }, { quoted: m });
      return;
    }
    await conn.sendMessage(m.chat, {text: ownerinfo, edit: key }, {quoted: m})
    await sleep(2000)
    await conn.sendMessage(m.chat, {text: text.trim(), edit: key }, {quoted: m})
    
    /*conn.sendButton(m.chat, text.trim(), '▢ DyLux  ┃ ᴮᴼᵀ\n▢ Sígueme en Instagram\nhttps://www.instagram.com/fg98_ff', pp, [
      ['ꨄ︎ Apoyar', `${_p}donate`],
      ['⏍ Info', `${_p}botinfo`],
      ['⌬ Grupos', `${_p}gpdylux`]
    ],m, rpl)*/
  
    m.react('📚') 
    
  } catch (e) {
    conn.reply(m.chat, '❎ Menu error', m)
    throw e
  }
}
handler.help = ['help']
handler.tags = ['main']
handler.command = ['miniwon', 'help', 'menú'] 
handler.register = false

handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('')
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}