(function () {
  'use strict';

  const get = function (target) {
    return document.querySelector(target);
  };

  let currentPage = 1;
  let total = 10;
  const limit = 10;
  const end = 100;

  const $posts = get('.posts');
  const $loader = get('.loader');

  const hideLoader = () => {
    $loader.classList.remove('show');
  };

  const showLoader = () => {
    $loader.classList.add('show');
  };

  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement('div');
      $post.classList.add('post');
      $post.innerHTML = `
          <div class="header">
            <div class="id">${post.id}.</div>
            <div class="title">${post.title}</div>
          </div>
          <div class="body">${post.body}</div>
      `;
      $posts.appendChild($post);
    });
  };

  const getPosts = async (page, limit) => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('에러가 발생했습니다.');
    }
    return await response.json();
  };

  const loadPosts = async (page, limit) => {
    showLoader();
    try {
      const response = await getPosts(page, limit);
      showPosts(response);
    } catch (error) {
      console.error(error.message);
    } finally {
      hideLoader();
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (total === end) {
      window.removeEventListener('scroll', handleScroll);
      return;
    }

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage++;
      total += 10;
      loadPosts(currentPage, limit);
      return;
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    loadPosts(currentPage, limit);
    window.addEventListener('scroll', handleScroll);
  });
})();

const country = 'kr';
const category = 'all';
const page = 1;
const pageSize = 5;
const apiKey = '378d7a13db334e0ead763177ef0e5d82';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
  category === 'all' ? '' : category
}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

// API 호출 및 데이터 가져오기
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    // 뉴스 아이템에 대한 반복문
    data.articles.forEach((article) => {
      // 썸네일, 제목, 내용 가져오기
      const thumbnail = article.urlToImage;
      const title = article.title;
      const content = article.content;

      // 화면에 표시하기
      const newsElement = document.createElement('div');

      // 썸네일 표시
      if (thumbnail) {
        const thumbnailImage = document.createElement('img');
        thumbnailImage.src = thumbnail;
        newsElement.appendChild(thumbnailImage);
      }

      // 제목 표시
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      newsElement.appendChild(titleElement);

      // 내용 표시
      const contentElement = document.createElement('p');
      contentElement.textContent = content;
      newsElement.appendChild(contentElement);

      // 화면에 추가하기
      document.body.appendChild(newsElement);
    });
  })
  .catch((error) => {
    console.error('뉴스를 불러오는 중 오류가 발생했습니다:', error);
  });
export default NewsList;
