import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';

const MAIN_CONTAINER = document.querySelector('.main');

const MOVIES_MODEL = new MoviesModel;
const FILMS_PRESENTER = new FilmsPresenter(MAIN_CONTAINER, MOVIES_MODEL);

FILMS_PRESENTER.init();
