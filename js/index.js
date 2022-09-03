const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
    return data;
  }
  catch (error) {
    console.log(error);
  }

}

const displayCategories = categories => {
  const categoriesContainer = document.getElementById('categories-container');
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
        <a onclick="loadNews('${category.category_id}')" class="btn btn-outline-success fs-6 mx-1" 
        >${category.category_name}</a>
        `;
    categoriesContainer.appendChild(categoryDiv);
  })
}

//------------------------------------------
// -----------------------------------------
const loadNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data[0]));
  console.log(data)
}

const displayNews = news => {
  console.log(displayNews);
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ``;
  const newsDiv = document.createElement('div');
  newsDiv.innerHTML = `
         <div class="card mb-3 mx-auto" style="max-width: 1000px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${news.title}</h5>
        <p class="card-text">${news.details.slice(0, 300)}...</p>
        <div class="d-flex  justify-content-between">
        <div><img src="${news.author.img}" style="height: 55px;" class="img-fluid rounded-circle rounded-5" alt=""></div>
        <div><P>${news.author.name}</P></div>
        <div> <a class="btn btn-outline-success fs-6 mx-1" href="https://">Details</a></div>
        </div>
        
      </div>
    </div>
  </div>
</div>`;
  newsContainer.appendChild(newsDiv);
}

loadCategories();