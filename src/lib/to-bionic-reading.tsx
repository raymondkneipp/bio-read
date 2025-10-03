export function toBionicReading(text: string, ratio: number = 0.4): string {
	return text
		.split(/\s+/) // split by whitespace
		.map((word) => {
			if (word.length === 0) return "";
			const cutoff = Math.ceil(word.length * ratio); // how many letters to bold
			const start = word.slice(0, cutoff);
			const end = word.slice(cutoff);
			return `<b class="text-foreground">${start}</b>${end}`;
		})
		.join(" ");
}
