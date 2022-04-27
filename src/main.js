import {render} from './render.js';
import NewMenuView from './view/new-menu-view.js';
import NewFilterView from './view/new-filter-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import NewPopupView from './view/new-popup-view.js';

const MAIN_CONTAINER = document.querySelector('.main');
const FOOTER = document.querySelector('.footer');

const FILMS_PRESENTER = new FilmsPresenter;

render(new NewMenuView, MAIN_CONTAINER);
render(new NewFilterView, MAIN_CONTAINER);

FILMS_PRESENTER.init(MAIN_CONTAINER);

render(new NewPopupView, FOOTER, 'afterend');
