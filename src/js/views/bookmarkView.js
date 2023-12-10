import icons from 'url:../../img/icons.svg';
import fractional from 'fractional';
import View from './View';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMessage = 'No bookmark saved yet. Try adding your favourite recipes :)';
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
                <div class="preview__user-generated">
                  <svg>
                    <use href="#icon-user"></use>
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
export default new BookmarkView();
