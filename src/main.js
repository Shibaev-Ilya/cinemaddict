import {render} from './render.js';
import NewMenuView from './view/new-menu-view.js';
import NewFilterView from './view/new-filter-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';

const MAIN_CONTAINER = document.querySelector('.main');
const FOOTER = document.querySelector('.footer');

const FILMS_PRESENTER = new FilmsPresenter;
const MOVIES_MODEL = new MoviesModel;

render(new NewMenuView, MAIN_CONTAINER);
render(new NewFilterView, MAIN_CONTAINER);

FILMS_PRESENTER.init(MAIN_CONTAINER, FOOTER, MOVIES_MODEL);
