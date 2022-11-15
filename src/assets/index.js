export function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export function sortArrayAsc(array) {
	for (let i = 0; i < array.length - 1; i++) {
		const el = array[i];
		const elNext = array[i + 1];

		if (elNext.points < el.points) {
			array[i] = array[i + 1];
			array[i + 1] = el;
		}
	}

	return array;
}