import axios from "axios";

export async function fetchReviews() {
	try {
		const { data } = await axios.get('https://portfolio-js.b.goit.study/api/reviews');
		return data;
	} catch (error) {
		console.error("Error", error)
	}
}