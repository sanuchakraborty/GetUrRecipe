import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import addRecipeView from './views/addRecipeView.js';
// Polyfilling
import 'core-js/stable'; // To polyfill everthing else other than async await
import 'regenerator-runtime/runtime'; // To polyfill async await
import { mark } from 'regenerator-runtime';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import { MODAL_CLOSE_SEC } from './config.js';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    searchResultsView.update(model.getSearchResultsPage());
    bookmarkView.render(model.state.bookmarks);
    //1. Loading Recipe
    await model.loadRecipe(id);
    //2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};
const controlSearch = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();
    await model.loadSearchResults(query);
    searchResultsView.render(
      model.getSearchResultsPage(model.state.search.page)
    );
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (page) {
  model.state.search.page = page;
  searchResultsView.render(model.getSearchResultsPage(model.state.search.page));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
};

const controlBookmark = function () {
  model.loadBookmark(model.state.recipe);
  recipeView.render(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderSpinner();
    setTimeout(function () {
      bookmarkView.render(model.state.bookmarks);
      addRecipeView.toggleWindow();
      // ChangeID in url
      window.history.pushState(null, '', `#${model.state.recipe.id}`);

      //window.history.back();
    }, MODAL_CLOSE_SEC * 3);
  } catch (error) {
    alert(error.message);
  }
};
const init = function () {
  recipeView.addHandlerRecipe(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearch);
  paginationView.paginationEventHandler(controlPagination);
  recipeView.addHandlerBookmark(controlBookmark);
  model.getBookmarksFromLocalStorage();
  bookmarkView.render(model.state.bookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
