import FilmsPresenter from './presenter/films-presenter.js';
import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import MoviesApiService from './services/movies-api-services.js';
import CommentsApiService from './services/comments-api-services.js';

const mainContainer = document.querySelector('.main');
const authorization = 'Basic KUfexEPWmTWDBtSuwggN';
const endPoint = 'https://17.ecmascript.pages.academy/cinemaddict';
const moviesApiService = new MoviesApiService(endPoint, authorization);
const commentsApiService = new CommentsApiService(endPoint, authorization);

const moviesModel = new MoviesModel(moviesApiService);
const commentsModel = new CommentsModel(commentsApiService);
const filterModel = new FilterModel;
const filmsPresenter = new FilmsPresenter(mainContainer, moviesModel, commentsModel, filterModel);
const filterPresenter = new FilterPresenter(mainContainer, filterModel, moviesModel);


filterPresenter.init();
filmsPresenter.init();
moviesModel.init();
