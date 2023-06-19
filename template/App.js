import { Nav, NewsList } from './components/index.js';

window.addEventListener('DOMContentLoaded', () => {
  const navComponent = new Nav();

  document.getElementById('root').appendChild(navComponent.element);
});
