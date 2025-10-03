export function toBionicParagraphsHTML(
	text: string,
	ratio: number = 0.4,
): string {
	return text
		.split(/\n+/) // split paragraphs
		.map((p) => p.trim())
		.filter((p) => p.length > 0)
		.map((p) => {
			const words = p.split(/\s+/).map((word) => {
				if (word.length === 0) return "";
				const cutoff = Math.ceil(word.length * ratio);
				const start = word.slice(0, cutoff);
				const end = word.slice(cutoff);
				return `<span class="font-bold text-foreground">${start}</span>${end}`;
			});
			return `<p>${words.join(" ")}</p>`;
		})
		.join("");
}
