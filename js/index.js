const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}

const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        console.log(category)

        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        <a class="btn btn-outline-success fs-5 mx-1" href="https://openapi.programming-hero.com/api/news/${category.category_id}">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryDiv);
    })
}

loadCategories();

