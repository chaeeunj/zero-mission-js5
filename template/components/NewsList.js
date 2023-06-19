// do something!

/* 
<div class="news-list-container">
  <article class="news-list">
    <section class="news-item">
      <div class="thumbnail">
        <a href="https://www.ajunews.com/view/20220220180410403" target="_blank" rel="noopener noreferrer">
          <img
            src="https://image.ajunews.com/content/image/2022/02/20/20220220180523846963.jpg"
            alt="thumbnail" />
        </a>
      </div>
      <div class="contents">
        <h2>
          <a href="https://www.ajunews.com/view/20220220180410403" target="_blank" rel="noopener noreferrer">
            ​[뉴욕증시 주간전망] 러시아-우크라이나 긴장 속 변동성 지속 - 아주경제
          </a>
        </h2>
        <p>
          이번 주(21일~25일·현지시간) 뉴욕 증시는 러시아와 우크라이나 간 지정학적 긴장과 우크라이나 간 미국
          연방준비제도(Fed·연준)의 긴축 우려에 계속해서...
        </p>
      </div>
    </section>
  </article>
  <div class="scroll-observer">
    <img src="img/ball-triangle.svg" alt="Loading..." />
  </div>
</div> */
import axios from 'axios';
class NewsList {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList.add('news-list-container');
  }

  // API 요청을 위한 메서드
  async fetchNews(category, page, pageSize) {
    const country = 'kr';
    const apiKey = '378d7a13db334e0ead763177ef0e5d82';

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      category === 'all' ? '' : category
    }&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  // 뉴스 데이터를 가져와서 렌더링하는 메서드
  async renderNews(category, page, pageSize) {
    const newsItemSection = document.querySelector('.news-item');
    newsItemSection.innerHTML = ''; // 기존의 뉴스 항목을 모두 비우기

    try {
      const articles = await this.fetchNews(category, page, pageSize);

      articles.forEach((article) => {
        const newsItem = this.createNewsItem(article);
        newsContainer.appendChild(newsItem);
      });
    } catch (error) {
      console.error('Error rendering news:', error);
    }
  }

  // 뉴스 항목을 생성하는 메서드
  createNewsItem(article) {
    const { title, description, url, urlToImage } = article;

    const articleElement = document.createElement('article');
    articleElement.classList.add('news-list');

    const sectionElement = document.createElement('section');
    sectionElement.classList.add('news-item');

    const thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');

    const thumbnailLink = document.createElement('a');
    thumbnailLink.href = url;
    thumbnailLink.target = '_blank';
    thumbnailLink.rel = 'noopener noreferrer';

    const thumbnailImage = document.createElement('img');
    thumbnailImage.src = urlToImage;
    thumbnailImage.alt = 'thumbnail';

    thumbnailLink.appendChild(thumbnailImage);
    thumbnail.appendChild(thumbnailLink);
    sectionElement.appendChild(thumbnail);

    const contents = document.createElement('div');
    contents.classList.add('contents');

    const heading = document.createElement('h2');

    const headingLink = document.createElement('a');
    headingLink.href = url;
    headingLink.target = '_blank';
    headingLink.rel = 'noopener noreferrer';
    headingLink.textContent = title;

    heading.appendChild(headingLink);
    contents.appendChild(heading);

    const paragraph = document.createElement('p');
    paragraph.textContent = description;

    contents.appendChild(paragraph);
    sectionElement.appendChild(contents);

    articleElement.appendChild(sectionElement);

    return articleElement;
  }

  // 뉴스 카테고리와 페이지 정보를 전달하여 뉴스를 렌더링
  async init() {
    const category = 'business';
    const page = 1;
    const pageSize = 5;

    await this.renderNews(category, page, pageSize);
  }
}

export default NewsList;
