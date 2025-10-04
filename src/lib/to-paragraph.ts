export function toParagraphsHTML(text: string): string {
	return text
		.split(/\n+/) // split on 1+ newlines
		.map((p) => p.trim())
		.filter((p) => p.length > 0) // skip empty lines
		.map((p) => `<p class="indent-8">${p}</p>`)
		.join("");
}
