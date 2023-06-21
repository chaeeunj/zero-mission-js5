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
class NewsList {
  constructor(category) {
    this.element = document.createElement('div');
    this.element.classList.add('news-list-container');
    this.category = category;
  }

  async renderNews() {
    this.element.innerHTML = ''; // 기존 뉴스 목록 제거

    const country = 'kr';
    const page = 1;
    const pageSize = 5;
    const apiKey = '378d7a13db334e0ead763177ef0e5d82';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${
      this.category === 'all' ? '' : this.category
    }&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;

    // API 호출 및 데이터 가져오기
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // 뉴스 아이템에 대한 반복문
      data.articles.forEach((article) => {
        // 썸네일, 제목, 내용 가져오기
        const url = article.url;
        const thumbnail =
          article.urlToImage ||
          'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
        const title = article.title;
        const description = article.description || '';

        const articleElement = document.createElement('article');
        articleElement.classList.add('news-list');

        const sectionElement = document.createElement('section');
        sectionElement.classList.add('news-item');

        const thumbnailElement = document.createElement('div');
        thumbnailElement.classList.add('thumbnail');
        thumbnailElement.innerHTML = `
            <a href=${url} target="_blank" rel="noopener noreferrer">
              <img
                src=${thumbnail}
                alt="thumbnail" />
            </a>
          `;
        sectionElement.appendChild(thumbnailElement);

        const contentElement = document.createElement('div');
        contentElement.classList.add('contents');
        contentElement.innerHTML = `
            <h2>
              <a href=${url} target="_blank" rel="noopener noreferrer">
                ${title}
              </a>
            </h2>
            <p>
              ${description}
            </p>
          `;
        // 화면에 추가하기
        sectionElement.appendChild(contentElement);
        articleElement.appendChild(sectionElement);

        this.element.appendChild(articleElement);
      });
    } catch (error) {
      console.error('뉴스를 불러오는 중 오류가 발생했습니다:', error);
    }
  }
}
export default NewsList;
