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

// 



const loadDetails = (_id) => {
  const url = `URL Format: https://openapi.programming-hero.com/api/news/${_id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displaydetails(data.data));
}



const displaydetails = details => {
  const newsContainer = document.getElementById('news-container');
  const detailsDiv = document.createElement('div');
  newsDiv.innerHTML = `
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      ...
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Understood</button>
    </div>
  </div>
</div>
</div>
`;
  newsContainer.appendChild(newsDiv);
}




<p class="card-text">${news.details}</p>
<div class="d-flex justify-content-between">
    <div>
        <P>Total views:${news.total_view ? news.total_view : 'No Views'}</p>
    </div>
</div>
<div>
    <P>Rating:${news.rating.number ? news.rating.number : 'No Rating'}</p>
</div>