import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const MAIN_CONTAINER = document.querySelector('.main');

const MOVIES_MODEL = new MoviesModel;
const COMMENTS_MODEL = new CommentsModel;
const FILTER_MODEL = new FilterModel;
const FILMS_PRESENTER = new FilmsPresenter(MAIN_CONTAINER, MOVIES_MODEL, COMMENTS_MODEL, FILTER_MODEL);
const FILTER_PRESENTER = new FilterPresenter(MAIN_CONTAINER, FILTER_MODEL, MOVIES_MODEL);


FILTER_PRESENTER.init();
FILMS_PRESENTER.init();
