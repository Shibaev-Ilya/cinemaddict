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

export {getRandomInteger, getRandomPositiveFloat, humanizeTaskDueDate, getRuntime};
