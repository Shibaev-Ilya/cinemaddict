import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from "./model/comments-model.js";

const MAIN_CONTAINER = document.querySelector('.main');

const MOVIES_MODEL = new MoviesModel;
const COMMENTS_MODEL = new CommentsModel;
const FILMS_PRESENTER = new FilmsPresenter(MAIN_CONTAINER, MOVIES_MODEL, COMMENTS_MODEL);

FILMS_PRESENTER.init();
