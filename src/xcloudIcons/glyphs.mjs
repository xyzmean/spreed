/*
 * SPDX-FileCopyrightText: 2026 xcloud
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

/**
 * Every glyph the xcloud design draws for Talk, in one table.
 *
 * There are two consumers and they are very far apart: `makeIcon.js` builds Vue
 * stand-ins for vue-material-design-icons components, and
 * `img/build-room-avatars.mjs` writes the conversation placeholder avatars that
 * `AvatarService` reads as plain files from PHP. Before this table the two
 * shared nothing, so the people glyph existed twice — once as a filled Material
 * path in `img/`, once as a stroke here — and they drifted apart by design
 * rather than by accident.
 *
 * This module deliberately imports nothing: the avatar generator is a plain
 * node script and must be able to read the table without a bundler, a Vue
 * runtime or a DOM.
 *
 * `d` is the markup that goes inside the pen (`fill: none`, round caps, the
 * stroke coloured by the call site), authored in a 24×24 box. `width` is the
 * pen weight from the mockup — heavier for small or sparse glyphs, because a
 * 1.8 pen disappears at 16 px.
 *
 * A name here does NOT by itself change a Vue icon: the rspack alias only
 * redirects names that have a `<Name>.js` file next to this one. Glyphs used
 * only by the avatars (`account-outline`, `web`, …) therefore stay out of the
 * bundle until somebody deliberately adds that file.
 */
export const glyphs = {
	// MessengerLight.dc.html — люди в аватаре группового чата, тот же глиф в шапке
	'account-multiple-outline': { d: '<circle cx="9" cy="8.4" r="3.1"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6"/><path d="M15.6 6.2a3 3 0 0 1 0 5.6M17.2 18.4c0-2.1-.9-3.6-2.3-4.3"/>', width: 1.8 },
	// глиф людей из макета с плюсом: та же кнопка в разговоре один на один
	'account-multiple-plus-outline': { d: '<circle cx="9" cy="8.4" r="3.1"/><path d="M3.8 18.4c0-2.7 2.3-4.6 5.2-4.6s5.2 1.9 5.2 4.6"/><path d="M16.4 7.6v5.2M13.8 10.2h5.2"/>', width: 1.8 },
	// один человек тем же пером: аватар обсуждения один на один и запасной аватар гостя
	'account-outline': { d: '<circle cx="12" cy="8.4" r="3.6"/><path d="M4.9 19.4c0-3 3.2-5.1 7.1-5.1s7.1 2.1 7.1 5.1"/>', width: 1.8 },
	// MessengerLight.dc.html — календарь в рельсе, он же «Предстоящие встречи»
	'calendar-blank-outline': { d: '<rect x="3.5" y="5" width="17" height="15" rx="4"/><path d="M3.5 9.6h17M8.4 3.4v3.2M15.6 3.4v3.2"/>', width: 1.8 },
	// запрет тем же пером: удалённое сообщение
	cancel: { d: '<circle cx="12" cy="12" r="8.2"/><path d="m6.2 6.2 11.6 11.6"/>', width: 1.8 },
	// MessengerLight.dc.html — доставленное сообщение и счётчик реакции
	check: { d: '<path d="m4.5 12.5 4.5 4.5L19.5 6.5"/>', width: 2.2 },
	// MessengerLight.dc.html — прочитанное сообщение
	'check-all': { d: '<path d="m2.5 12.5 4 4 7-8"/><path d="m11 15.5 1 1 7-8"/>', width: 2.2 },
	// двойная стрелка тем же пером: прокрутить к последнему сообщению
	'chevron-double-down': { d: '<path d="m6 5.6 6 5.4 6-5.4"/><path d="m6 12.6 6 5.4 6-5.4"/>', width: 1.9 },
	// крест в том же пере: закрыть панель, снять вложение, отменить правку
	close: { d: '<path d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6"/>', width: 2 },
	// MessengerLight.dc.html — шестерёнка в рельсе, она же «Настройки приложения»
	'cog-outline': { d: '<circle cx="12" cy="12" r="3.1"/><path d="M19.2 14.2a1.6 1.6 0 0 0 .32 1.76l.06.06a1.94 1.94 0 1 1-2.74 2.74l-.06-.06a1.6 1.6 0 0 0-1.76-.32 1.6 1.6 0 0 0-.97 1.47v.17a1.94 1.94 0 1 1-3.88 0v-.09a1.6 1.6 0 0 0-1.05-1.46 1.6 1.6 0 0 0-1.76.32l-.06.06A1.94 1.94 0 1 1 4.56 16.1l.06-.06a1.6 1.6 0 0 0 .32-1.76 1.6 1.6 0 0 0-1.47-.97h-.17a1.94 1.94 0 1 1 0-3.88h.09a1.6 1.6 0 0 0 1.46-1.05 1.6 1.6 0 0 0-.32-1.76l-.06-.06A1.94 1.94 0 1 1 7.2 3.62l.06.06a1.6 1.6 0 0 0 1.76.32h.08a1.6 1.6 0 0 0 .97-1.47v-.17a1.94 1.94 0 1 1 3.88 0v.09a1.6 1.6 0 0 0 .97 1.46 1.6 1.6 0 0 0 1.76-.32l.06-.06a1.94 1.94 0 1 1 2.74 2.74l-.06.06a1.6 1.6 0 0 0-.32 1.76v.08a1.6 1.6 0 0 0 1.47.97h.17a1.94 1.94 0 1 1 0 3.88h-.09a1.6 1.6 0 0 0-1.46.97Z"/>', width: 1.8 },
	// набор номера тем же пером, что три точки
	dialpad: { d: '<path d="M7 6.4h.01M12 6.4h.01M17 6.4h.01M7 12h.01M12 12h.01M17 12h.01M7 17.6h.01M12 17.6h.01"/><path d="M17 17.6h.01"/>', width: 2.2 },
	// конверт тем же пером: обсуждение, куда приглашены по почте
	'email-outline': { d: '<rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.6"/><path d="m4.4 7.6 7.6 5.2 7.6-5.2"/>', width: 1.8 },
	// MessengerLight.dc.html — смайл в строке ввода
	'emoticon-outline': { d: '<circle cx="12" cy="12" r="8.2"/><path d="M8.8 14.2a4.2 4.2 0 0 0 6.4 0"/><path d="M9.3 9.6h.01M14.7 9.6h.01"/>', width: 1.8 },
	// лист с загнутым углом тем же пером: обсуждение о файле
	'file-document-outline': { d: '<path d="M13.4 3.6H7.4a2.2 2.2 0 0 0-2.2 2.2v12.4a2.2 2.2 0 0 0 2.2 2.2h9.2a2.2 2.2 0 0 0 2.2-2.2V9.2Z"/><path d="M13.4 3.6v5.6h5.4"/><path d="M8.6 13.6h6.8M8.6 16.8h4.4"/>', width: 1.8 },
	// в макете фильтра нет: воронка нарисована тем же пером, что «+» рядом с ней
	'filter-variant': { d: '<path d="M4 6.5h16M6.8 12h10.4M9.6 17.5h4.8"/>', width: 1.9 },
	// в макете сброса фильтра нет: та же воронка с крестом
	'filter-variant-remove': { d: '<path d="M3.5 6.5h17M6.3 12h7.2M9.1 17.5h1.8"/><path d="m16 15 4.5 4.5M20.5 15 16 19.5"/>', width: 1.9 },
	// звено цепи тем же пером: обсуждение, открытое по ссылке
	'link-variant': { d: '<path d="m9.4 14.6 5.2-5.2"/><path d="m11.2 6.6 2-2a3.7 3.7 0 0 1 5.2 5.2l-2 2"/><path d="m12.8 17.4-2 2a3.7 3.7 0 0 1-5.2-5.2l2-2"/>', width: 1.8 },
	// замок тем же пером: обсуждение с проверкой по паролю
	'lock-outline': { d: '<rect x="4.8" y="10.2" width="14.4" height="9.6" rx="2.6"/><path d="M8.2 10.2V7.4a3.8 3.8 0 0 1 7.6 0v2.8"/>', width: 1.8 },
	// MessengerLight.dc.html — поиск по чатам и поиск в шапке обсуждения
	magnify: { d: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>', width: 1.9 },
	// в макете диктофона нет (I-018), но пока кнопка стоит между скрепкой и отправкой — тем же пером
	'microphone-outline': { d: '<rect x="9" y="3.2" width="6" height="10.6" rx="3"/><path d="M5.6 11.6a6.4 6.4 0 0 0 12.8 0M12 18v2.6"/>', width: 1.8 },
	// MessengerLight.dc.html — скрепка в строке ввода
	paperclip: { d: '<path d="M20 11.5 12.4 19a4.6 4.6 0 0 1-6.5-6.5l7.6-7.6a3 3 0 0 1 4.3 4.3l-7.6 7.6a1.5 1.5 0 0 1-2.2-2.2l7-7"/>', width: 1.8 },
	// MessengerLight.dc.html — звонок в шапке обсуждения
	'phone-outline': { d: '<path d="M6.7 4.5h3l1.4 3.6-2 1.3a11 11 0 0 0 5 5l1.3-2 3.6 1.4v3a1.7 1.7 0 0 1-1.9 1.7C10.6 17.8 6.1 13.3 5 6.4a1.7 1.7 0 0 1 1.7-1.9Z"/>', width: 1.8 },
	// MessengerLight.dc.html — «+» в шапке списка чатов
	plus: { d: '<path d="M12 5v14M5 12h14"/>', width: 1.9 },
	// MessengerLight.dc.html — кнопка отправки
	send: { d: '<path d="M4.5 11.8 19.5 5l-6.8 15-2-6.2-6.2-2Z"/>', width: 2 },
	// развернуть тем же пером: показать системные сообщения
	'unfold-more-horizontal': { d: '<path d="m7.5 9.4 4.5-4.4 4.5 4.4"/><path d="m7.5 14.6 4.5 4.4 4.5-4.4"/>', width: 1.9 },
	// MessengerLight.dc.html — кнопка «Видеозвонок»
	'video-outline': { d: '<rect x="3" y="6" width="12.5" height="12" rx="3"/><path d="m15.5 11 5-2.8v7.6l-5-2.8Z"/>', width: 1.9 },
	// глобус тем же пером: обсуждение с чужого сервера
	web: { d: '<circle cx="12" cy="12" r="8.4"/><path d="M3.7 12h16.6"/><path d="M12 3.6a12.6 12.6 0 0 1 0 16.8 12.6 12.6 0 0 1 0-16.8Z"/>', width: 1.8 },
}

/**
 * Look one glyph up by name, loudly.
 *
 * A missing name used to mean an icon that renders as an empty box — visible
 * only if somebody happens to open that screen. Throwing turns a typo into a
 * build error instead.
 *
 * @param {string} name kebab-case glyph name, a key of `glyphs`
 * @return {{d: string, width: number}} markup inside the pen, and the pen weight
 */
export function glyph(name) {
	const found = glyphs[name]
	if (!found) {
		throw new Error(`xcloudIcons: нет глифа «${name}» в glyphs.mjs`)
	}
	return found
}
