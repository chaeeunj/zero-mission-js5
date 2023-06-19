// do something!

/* <nav class="category-list">
  <ul>
    <li id="all" class="category-item active">전체보기</li>
    <li id="business" class="category-item">비즈니스</li>
    <li id="entertainment" class="category-item">엔터테인먼트</li>
    <li id="health" class="category-item">건강</li>
    <li id="science" class="category-item">과학</li>
    <li id="sports" class="category-item">스포츠</li>
    <li id="technology" class="category-item">기술</li>
  </ul>
</nav> */

class Nav {
  constructor() {
    this.element = document.createElement('nav');
    this.element.classList.add('category-list');

    const ul = document.createElement('ul');
    const categories = [
      { id: 'all', name: '전체보기' },
      { id: 'business', name: '비즈니스' },
      { id: 'entertainment', name: '엔터테인먼트' },
      { id: 'health', name: '건강' },
      { id: 'science', name: '과학' },
      { id: 'sports', name: '스포츠' },
      { id: 'technology', name: '기술' },
    ];

    categories.forEach((category) => {
      const li = document.createElement('li');
      li.id = category.id;
      li.textContent = category.name;
      li.classList.add('category-item');
      if (category.id === 'all') {
        li.classList.add('active');
      }
      ul.appendChild(li);
    });

    this.element.appendChild(ul);
  }
}

export default Nav;
