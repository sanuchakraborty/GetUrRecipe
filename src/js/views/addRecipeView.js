import icons from 'url:../../img/icons.svg';
import View from './View';
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  constructor() {
    super();
    this._addHandlerRecipeShowWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerRecipeShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this._addHandlerRecipeHideWindow();
  }
  _addHandlerRecipeHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const formDataArr = [...new FormData(this)]; // Here 'this; refers to the Parent Element i.e. the form element. Not to the object;
      const formData = Object.fromEntries(formDataArr);
      handler(formData);
    });
  }
}
export default new AddRecipeView();
