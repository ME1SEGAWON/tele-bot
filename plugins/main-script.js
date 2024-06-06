import { promises } from 'fs'
import { join } from 'path'

let handler = async function (m, { conn, __dirname }) {
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
  
m.reply(`
*≡ SCRIPT*

▢ SC PRIVATE WAK, BIKIN SENDIRI

DEVELOPED BY SEGAWON SGWN
Contact SEGAWON :
Web: https://home.miniwon.store
Email: support@miniwon.store
© 2024 MINIWON`)
}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['sc', 'git', 'script'] 

export default handler
