import icons from 'url:../../img/icons.svg';
import View from './View';
class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMessage = 'We could not find recipe your item. Please try another one :)';
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    ${this._data
      .map(rec => {
        return `
      <li class="preview">
            <a class="preview__link ${
              id === rec.id ? 'preview__link--active' : ''
            }" href="#${rec.id}">
              <figure class="preview__fig">
                <img src=${rec.image} alt=${rec.title} />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${rec.title} ...</h4>
                <p class="preview__publisher">${rec.publisher}</p>
                <div class="preview__user-generated ${rec.key ? '':'hidden'}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
      `;
      })
      .join('')}
    `;
  }
}

export default new SearchResultsView();
