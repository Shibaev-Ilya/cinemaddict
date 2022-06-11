import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import MoviesApiService from './services/movies-api-services.js';
import CommentsApiService from './services/comments-api-services.js';

const MAIN_CONTAINER = document.querySelector('.main');
const AUTHORIZATION = 'Basic KUfexEPWmTWDBtSuwggN';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';
const MOVIES_API_SERVICE = new MoviesApiService(END_POINT, AUTHORIZATION);
const COMMENTS_API_SERVICE = new CommentsApiService(END_POINT, AUTHORIZATION);

const MOVIES_MODEL = new MoviesModel(MOVIES_API_SERVICE);
const COMMENTS_MODEL = new CommentsModel(COMMENTS_API_SERVICE);
const FILTER_MODEL = new FilterModel;
const FILMS_PRESENTER = new FilmsPresenter(MAIN_CONTAINER, MOVIES_MODEL, COMMENTS_MODEL, FILTER_MODEL);
const FILTER_PRESENTER = new FilterPresenter(MAIN_CONTAINER, FILTER_MODEL, MOVIES_MODEL);


FILTER_PRESENTER.init();
FILMS_PRESENTER.init();
MOVIES_MODEL.init();
