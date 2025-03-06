export function renderReviews(cards) {
  const html = cards
    .map(({ _id, author, avatar_url, review }) => {
      return `
		<li class="swiper-slide review-card">
		<img src="${avatar_url}" alt="${author}"/>
		<div class="review-info">
		<h3>${author}</h3>
		<p>${review}</p>
		</div>
		</li>
		`;
    })
    .join('');
		console.log(html);
		return html;
}
