import icons from 'url:../../img/icons.svg';
import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //Page 1 and others
    if (curPage === 1 && numOfPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline  pagination__btn--next">
        <span>Page</span><span id="next"> ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    //Other page
    if (curPage > 1 && curPage < numOfPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline  pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page</span><span id="prev">${curPage - 1}</span>
    </button>
    <button data-goto="${
      curPage + 1
    }" class="btn--inline   pagination__btn--next">
      <span>Page</span><span id="next">${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //Last page
    if (curPage === numOfPages && numOfPages>1) {
      return `<button data-goto="${
        curPage - 1
      } "class="btn--inline  pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page</span><span id="prev">${curPage - 1}</span>
      </button>`;
    }
    //Only one page
    else return '';
  }
  paginationEventHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
        const curPage = +button.dataset.goto;
        handler(curPage);
    });
  }
}
export default new PaginationView();
