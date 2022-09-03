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
    .then(data => displayNews(data.data));
}

const displayNews = newses => {
  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ``;
  const resultsDiv = document.createElement('div');
  resultsDiv.innerHTML = `
  <h1 class="text-primary">${newses.length ? newses.length : 'No'} results is found in this category</h1>
  `
  newsContainer.appendChild(resultsDiv);

  newses.forEach(news => {
    console.log(news);
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
        <div class="d-flex">
        <div><img src="${news.author.img}" style="height: 55px;" class="img-fluid rounded-circle rounded-5" alt=""></div>
        <div><P>${news.author.name ? news.author.name : 'Unkhown Author'}</P></div></div>
        <div class="d-flex">
        <div><i class="fa-light fa-eye"></i></div><div>
        <P>views:${news.total_view ? news.total_view : 'No Views'}</p></div>
        </div>
        <div id="modal"><a onclick="loadDetails('${news._id}') type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</a></div>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <p class="card-text">${news.details}</p>
        <div class="d-flex justify-content-between">
        <div>
        <P>Total views:${news.total_view ? news.total_view : 'No Views'}</p></div>
        </div>
        <div>
        <P>Rating:${news.rating.number ? news.rating.number : 'No Rating'}</p></div>
        </div>
        </div>
        </div>
        <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`;
    newsContainer.appendChild(newsDiv);
  })
}

loadCategories();