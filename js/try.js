console.log('this is');


// const loadNews = async (category_id) => {
const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
const res = await fetch(url);
const data = await res.json();
displayNews(data.data[0]);
}

// const displayNews = news => {
console.log(news);
}

// loadNew();