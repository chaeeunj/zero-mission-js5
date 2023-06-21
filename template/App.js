import { Nav, NewsList } from './components/index.js';

window.addEventListener('DOMContentLoaded', () => {
  const navComponent = new Nav();
  document.getElementById('root').appendChild(navComponent.element);

  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach((categoryItem) => {
    categoryItem.addEventListener('click', onclickCategory);
  });

  const initialCategory = 'all';
  const newsListContainer = document.createElement('div');
  newsListContainer.classList.add('news-list-container');
  document.getElementById('root').appendChild(newsListContainer);
  renderNews(initialCategory, newsListContainer);
});

const onclickCategory = async (event) => {
  const categoryItems = document.querySelectorAll('.category-item');

  categoryItems.forEach((categoryItem) => {
    if (categoryItem.id !== event.target.id) {
      categoryItem.classList.remove('active');
    } else {
      event.target.classList.add('active');
      const selectedCategory = event.target.id;

      // 기존의 NewsList 요소 제거
      const newsListContainer = document.querySelector('.news-list-container');
      newsListContainer.innerHTML = '';

      // 뉴스 목록 렌더링
      renderNews(selectedCategory, newsListContainer);
      const newsListComponent = new NewsList(selectedCategory);
      newsListComponent.renderNews();
      document.getElementById('root').appendChild(newsListComponent.element);
    }
  });
};

async function renderNews(category, container) {
  const newsList = new NewsList(category);
  await newsList.renderNews();
  container.appendChild(newsList.element);
}
