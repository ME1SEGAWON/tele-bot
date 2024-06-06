import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['59172945992', 'FG98', true],
  ['5492622271736'], 
  ['5492622271736'] 
] //Numeros de owner 

global.mods = ['573125484672'] 
global.prems = ['50489079501', '5219631769130', '573125484672']
global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api.fgmods.xyz': 'dEBWvxCY' //--- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'DyLux┃ᴮᴼᵀ' 
global.author = '@fg98' 
global.fgig = '▢ Sígueme en Instagram\nhttps://www.instagram.com/fg98_ff\n' 
global.dygp = 'https://chat.whatsapp.com/BESBo5xjvIZE4YVvth6Yzr'
global.fgsc = 'https://github.com/FG98F/dylux-fg' 
global.fgyt = 'https://youtube.com/fg98f'
global.fgpyp = 'https://paypal.me/fg98f'
global.fglog = 'https://i.imgur.com/Owmb93c.png' 

global.wait = '*⌛ _Cargando..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      agility: '🤸‍♂️',
      arc: '🏹',
      armor: '🥼',
      bank: '🏦',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      bow: '🏹',
      bull: '🐃',
      cat: '🐈',
      chicken: '🐓',
      common: '🔘',
      cow: '🐄',
      crystal: '🔮',
      darkcrystal: '♠️',
      diamond: '💎',
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      emerald: '💚',
      exp: '✉️',
      fishingrod: '🎣',
      fox: '🦊',
      gems: '🍀',
      giraffe: '🦒',
      gold: '👑',
      health: '❤️',
      horse: '🐎',
      kepiting: '🦀',
      lobster: '🦞',
      udang: '🦐',
      cumi: '🦑',
      gurita: '🐙',
      buntal: '🐡',
      dory: '🐟',
      orca: '🐋',
      lumba: '🐬',
      paus: '🐳',
      ikan: '🐠',
      hiu: '🦈',
      banteng: '🐂',
      harimau: '🐅',
      gajah: '🐘',
      kambing: '🐐',
      panda: '🐼',
      buaya: '🐊',
      kerbau: '🐃',
      sapi: '🐄',
      monyet: '🐒',
      babihutan: '🐗',
      babi: '🐖',
      ayam: '🐓',
      intelligence: '🧠',
      iron: '⛓️',
      keygold: '🔑',
      keyiron: '🗝️',
      knife: '🔪',
      legendary: '🗃️',
      level: '🧬',
      limit: '🌌',
      lion: '🦁',
      magicwand: '⚕️',
      mana: '🪄',
      money: '💵',
      mythic: '🗳️',
      pet: '🎁',
      petFood: '🍖',
      pickaxe: '⛏️',
      pointxp: '📧',
      potion: '🥤',
      rock: '🪨',
      snake: '🐍',
      stamina: '⚡',
      strength: '🦹‍♀️',
      string: '🕸️',
      superior: '💼',
      sword: '⚔️',
      tiger: '🐅',
      trash: '🗑',
      uncommon: '🎁',
      upgrader: '🧰',
      wood: '🪵',
      // New emojis
      aqua: '💧',
      foodpet: '🍖',
      coal: '🔲',
      Fox: '🦊',
      naga: '🐉',
      anggur: '🍇',
      apel: '🍎',
      batu: '🪨',
      berlian: '💎',
      botol: '🍾',
      centaur: '🐎',
      eleksirb: '🧪',
      emasbatang: '🥇',
      emasbiasa: '🥇',
      gardenboc: '🌳',
      gardenboxs: '🌳',
      griffin: '🦅',
      healtmonster: '💊',
      jeruk: '🍊',
      kaleng: '🥫',
      kardus: '📦',
      ketake: '🪓',
      koinexpg: '💰',
      kucing: '🐈',
      kuda: '🐎',
      kyubi: '🦊',
      makanancentaur: '🍖',
      makanangriffin: '🍖',
      makanankyubi: '🍖',
      makanannaga: '🍖',
      makananpet: '🍖',
      makananphonix: '🍖',
      mangga: '🥭',
      pancingan: '🎣',
      phonix: '🔥',
      pisang: '🍌',
      rubah: '🦊',
      sampah: '🗑️',
      serigala: '🐺',
      tiketcoin: '🎟️',
      kepiting: '🦀',
      lobster: '🦞',
      udang: '🦐',
      cumi: '🦑',
      gurita: '🐙',
      buntal: '🐡',
      dory: '🐠',
      orca: '🐋',
      lumba: '🐬',
      paus: '🐳',
      ikan: '🐟',
      hiu: '🦈',
      banteng: '🐂',
      harimau: '🐅',
      gajah: '🐘',
      kambing: '🐐',
      panda: '🐼',
      buaya: '🐊',
      kerbau: '🐃',
      sapi: '🐄',
      monyet: '🐒',
      babihutan: '🐗',
      babi: '🐖',
      ayam: '🐓',
      umpan: '🎣'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
};

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
