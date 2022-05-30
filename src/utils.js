import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// возвращает рандомное чтсло с num количеством знаков после запятой
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

const humanizeTaskDueDate = (dueDate, format) => dayjs(dueDate).format(format);

const getRuntime = (time) => {
  const minutes = time % 60;
  const hours = Math.trunc(time / 60);
  return `${hours}h ${minutes}m`;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const sortRatingUp = (movieA, movieB) => {
  if (movieA['film_info']['total_rating'] < movieB['film_info']['total_rating']) {
    return 1; }
  if (movieA['film_info']['total_rating'] > movieB['film_info']['total_rating']) {
    return -1; }
  return 0;
};

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortMovieDate = (movieA, movieB) => {
  const weight = getWeightForNullDate(movieA['film_info']['release']['date'], movieB['film_info']['release']['date']);
  return weight ?? dayjs(movieB['film_info']['release']['date']).diff(dayjs(movieA['film_info']['release']['date']));
};

const SortType = {
  DEFAULT: 'default',
  SORT_DATE: 'sort-date',
  SORT_RATING: 'sort-rating',
};

export {getRandomInteger, getRandomPositiveFloat, humanizeTaskDueDate, getRuntime, updateItem, sortRatingUp, sortMovieDate, SortType};
