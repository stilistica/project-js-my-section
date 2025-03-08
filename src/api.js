import axios from "axios";

export async function fetchReviews() {
	try {
		const { data } = await axios.get('https://portfolio-js.b.goit.study/api/reviewss');
		return data;
	} catch (error) {
		console.error("Error", error)
	}
}