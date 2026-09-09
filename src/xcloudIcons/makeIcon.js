/*
 * SPDX-FileCopyrightText: 2026 xcloud
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { h } from 'vue'
import { glyph } from './glyphs.mjs'

/**
 * Build a stroke icon that can stand in for a vue-material-design-icons one.
 *
 * The xcloud design draws icons as strokes: one pen, rounded caps, weight
 * between 1.8 and 2.4 depending on how small the icon is rendered. Material
 * Design ships filled paths, and no amount of CSS turns a filled path into a
 * stroke, so the icons have to be replaced rather than restyled.
 *
 * What matters here is the shape of the wrapper, not the artwork: the span
 * keeps `material-design-icon <name>-icon` and the svg keeps
 * `material-design-icon__svg`, because that is what the theme layer sizes and
 * colours. The props and the click event are the ones the package exposes, so
 * a call site does not change when its icon does.
 *
 * The artwork itself is not here: it comes from `glyphs.mjs`, which is also
 * what generates the conversation placeholder avatars that PHP serves. One
 * table, two very different consumers — otherwise the same glyph gets drawn
 * twice and the two copies drift.
 *
 * @param {string} name kebab-case icon name, e.g. `chevron-double-down`
 * @return {object} Vue component with the vue-material-design-icons interface
 */
export function makeIcon(name) {
	const { d: body, width: strokeWidth } = glyph(name)
	const componentName = name.replace(/(^|-)([a-z])/g, (match, dash, letter) => letter.toUpperCase()) + 'Icon'

	return {
		name: componentName,
		emits: ['click'],

		props: {
			title: {
				type: String,
				default: undefined,
			},
			fillColor: {
				type: String,
				default: 'currentColor',
			},
			size: {
				type: Number,
				default: 24,
			},
		},

		render() {
			const title = this.title
				? `<title>${this.title.replace(/[<>&]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[char])}</title>`
				: ''

			return h('span', {
				class: `material-design-icon ${name}-icon`,
				role: 'img',
				'aria-hidden': this.title ? null : 'true',
				'aria-label': this.title,
				onClick: (event) => this.$emit('click', event),
			}, [
				h('svg', {
					class: 'material-design-icon__svg',
					width: this.size,
					height: this.size,
					viewBox: '0 0 24 24',
					// The pen: no fill, and whatever colour the call site asked
					// for goes to the stroke — for a stroke icon that is what
					// `fillColor` means.
					fill: 'none',
					stroke: this.fillColor,
					'stroke-width': strokeWidth,
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					innerHTML: title + body,
				}),
			])
		},
	}
}
