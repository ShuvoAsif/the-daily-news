
//---------------------------all news category--------------------------------- 

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

//------------------------------loadNews-----------------------------

const loadNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error));

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
           <div>
             <img src="${news.author.img}" style="height: 55px;" class="img-fluid rounded-circle rounded-5" alt="">
           </div>
           <div>
             <P>${news.author.name ? news.author.name : 'Unkhown Author'}</P>
           </div>
         </div>
         <div class="d-flex">
            <div>
             <i class="fa-light fa-eye"></i>
            </div>
            <div>
              <P>views:${news.total_view ? news.total_view : 'No Views'}</p>
          </div>
       </div>
        <div id="modal">
        <button onclick="showModal('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">detals</button>
        </div>
      </div>
    </div>
  </div>
</div>`;
    newsContainer.appendChild(newsDiv);
  })
}

//------------------------------modal------------------------------
const showModal = (_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${_id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.data))
    .catch(error => console.log(error));
}



const displayModal = modals => {
  console.log(modals)
  const modalsContainer = document.getElementById('modalBody');
  const modalsTitleContainer = document.getElementById('staticBackdropLabel');
  modals.forEach(modal => {
    console.log(modal.title);
    modalsTitleContainer.innerHTML = `<h5>${modal.title}</h5>`
    modalsContainer.innerHTML = `
    <p class="card-text">${modal.details}</p>
    <div class="d-flex justify-content-between">
        <div>
            <P>Total views:${modal.total_view ? modal.total_view : 'No Views'}</p>
        </div>

        <div>
            <P>Rating:${modal.rating.number ? modal.rating.number : 'No Rating'}</p>
        </div>
    </div>`
  })
}
loadNews('08');
loadCategories();