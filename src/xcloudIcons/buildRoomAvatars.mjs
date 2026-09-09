/*
 * SPDX-FileCopyrightText: 2026 xcloud
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Draw the conversation placeholder avatars from the xcloud glyph table.
 *
 *   node src/xcloudIcons/buildRoomAvatars.mjs           # redraw img/icon-conversation-*.svg
 *   node src/xcloudIcons/buildRoomAvatars.mjs --check   # fail if a file is out of date
 *
 * Why a generator and not twenty hand-written files: these avatars are the one
 * place where the design leaves the bundle. `AvatarService::getAvatarPath()`
 * picks a file by conversation type and PHP streams it, so the glyphs cannot
 * come from `src/xcloudIcons` at runtime — but they must be the same glyphs,
 * with the same pen, or the chat list shows a stroke icon next to a filled one.
 * Generating from `glyphs.mjs` makes that true by construction; `--check` says
 * so out loud, so a glyph edited in the table cannot silently leave the avatars
 * behind.
 *
 * The output is committed on purpose: img/ is read by PHP at runtime and has no
 * build step of its own. The generator itself sits next to the table it reads
 * rather than next to the files it writes: src/ is linted and is not one of the
 * directories deploy/deploy-app-frontend.sh copies to the instance, so the
 * script stays checked and stays unserved. (img/ would be served; /build is
 * gitignored in this fork and would not be committed at all.)
 */

import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { glyph } from './glyphs.mjs'

const img = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'img')

// MessengerLight.dc.html: круг 44 px в поверхности списка, глиф 21 px пером 1.8
// в цвете второй строки. Тона названы так, как их просит AvatarService:
// `bright` — светлая тема (Latte), `dark` — тёмная (Mocha).
const TONES = {
	bright: { background: '#ccd0da', stroke: '#5c5f77' },
	dark: { background: '#313244', stroke: '#a6adc8' },
}

const SIZE = 44
const GLYPH_SIZE = 21

// Имя файла -> глиф. Имена — те же, что перечисляет AvatarService::getAvatarPath();
// это единственная связь между PHP и этой таблицей, поэтому она здесь, а не
// вычисляется.
const AVATARS = {
	// групповое обсуждение — глиф людей прямо из макета
	group: 'account-multiple-outline',
	// один на один: аватар человека есть почти всегда, но не у удалённого участника
	user: 'account-outline',
	// открытое по ссылке
	public: 'link-variant',
	// обсуждение о файле
	text: 'file-document-outline',
	// проверка по паролю перед звонком
	password: 'lock-outline',
	// гость, приглашённый по почте
	mail: 'email-outline',
	// звонок с телефона
	phone: 'phone-outline',
	// обсуждение, заведённое встречей календаря
	event: 'calendar-blank-outline',
	// обсуждение с чужого сервера
	federation: 'web',
	// голосовая комната: микрофон, а не громкоговоритель — в неё говорят
	'voice-room': 'microphone-outline',
}

/**
 * Render one placeholder avatar.
 *
 * @param {string} glyphName key in the glyph table
 * @param {{background: string, stroke: string}} tone colours for one theme
 * @return {string} svg document
 */
function render(glyphName, tone) {
	const { d, width } = glyph(glyphName)
	const offset = (SIZE - GLYPH_SIZE) / 2
	const scale = GLYPH_SIZE / 24

	// Фон рисуется квадратом на всю область, а не кругом: круг из аватара делает
	// сам клиент (`border-radius`), и обсуждению с загруженной картинкой он
	// достаётся тем же правилом. Круг внутри файла дал бы второй, чуть меньший.
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}" version="1.1">
	<rect width="${SIZE}" height="${SIZE}" fill="${tone.background}"/>
	<g transform="translate(${offset} ${offset}) scale(${scale})" fill="none" stroke="${tone.stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">
		${d}
	</g>
</svg>
`
}

const check = process.argv.includes('--check')
const stale = []
let written = 0

for (const [type, glyphName] of Object.entries(AVATARS)) {
	for (const [tone, colours] of Object.entries(TONES)) {
		const file = path.join(img, `icon-conversation-${type}-${tone}.svg`)
		const content = render(glyphName, colours)
		const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
		if (current === content) {
			continue
		}
		if (check) {
			stale.push(path.basename(file))
			continue
		}
		fs.writeFileSync(file, content)
		written++
	}
}

if (check) {
	if (stale.length) {
		console.error(`аватары обсуждений разошлись с glyphs.mjs: ${stale.join(', ')}`)
		console.error('пересоберите: node src/xcloudIcons/buildRoomAvatars.mjs')
		process.exit(1)
	}
	console.info(`аватары обсуждений совпадают с glyphs.mjs (${Object.keys(AVATARS).length} типов)`)
} else {
	console.info(`перерисовано файлов: ${written} из ${Object.keys(AVATARS).length * Object.keys(TONES).length}`)
	const digest = createHash('md5')
	for (const [type, glyphName] of Object.entries(AVATARS)) {
		digest.update(type + glyphName)
	}
	console.info(`набор типов: ${digest.digest('hex').slice(0, 8)}`)
}
