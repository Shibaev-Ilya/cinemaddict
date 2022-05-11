import {render} from './framework/render.js';
import NewMenuView from './view/new-menu-view.js';
import NewFilterView from './view/new-filter-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';

const MAIN_CONTAINER = document.querySelector('.main');

const MOVIES_MODEL = new MoviesModel;
const FILMS_PRESENTER = new FilmsPresenter(MAIN_CONTAINER, MOVIES_MODEL);


render(new NewMenuView, MAIN_CONTAINER);
render(new NewFilterView, MAIN_CONTAINER);

FILMS_PRESENTER.init();
