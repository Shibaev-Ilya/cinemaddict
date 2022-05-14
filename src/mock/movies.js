import {getRandomInteger, getRandomPositiveFloat} from '../utils.js';

const generateTitle = () => {
  const titles = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians'
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const postersSrc = [
    'images/posters/the-dance-of-life.jpg',
    'images/posters/sagebrush-trail.jpg',
    'images/posters/the-man-with-the-golden-arm.jpg',
    'images/posters/santa-claus-conquers-the-martians.jpg',
    'images/posters/made-for-each-other.png',
    'images/posters/popeye-meets-sinbad.png',
    'images/posters/the-great-flamarion.jpg'
  ];

  const randomIndex = getRandomInteger(0, postersSrc.length - 1);

  return postersSrc[randomIndex];
};

let id = 0;
const getId = () => id++ ;

const getCommentsId = () => {
  const ids = new Set;

  for (let i = 0; i < getRandomInteger(0, 20); i++) {
    ids.add(getRandomInteger(0, 20));
  }
  return Array.from(ids);
};

const generateMovie = () => ({
  'id': getId(),
  'comments': getCommentsId(),
  'film_info': {
    'title': generateTitle(),
    'alternative_title': 'Laziness Who Sold Themselves',
    'total_rating': getRandomPositiveFloat(0, 10, 1),
    'poster': generatePoster(),
    'age_rating': getRandomInteger(0, 18),
    'director': 'Tom Ford',
    'writers': [
      'Takeshi Kitano', 'Arnold Schwarzenegger'
    ],
    'actors': [
      'Morgan Freeman', 'Silvester Stallone'
    ],
    'release': {
      'date': '2019-05-11T00:00:00.000Z',
      'release_country': 'Finland'
    },
    'runtime': getRandomInteger(45, 150),
    'genre': [
      'Comedy',
    ],
    'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
  },
  'user_details': {
    'watchlist': Boolean(getRandomInteger(0, 1)),
    'already_watched': Boolean(getRandomInteger(0, 1)),
    'watching_date': '2019-04-12T16:12:32.554Z',
    'favorite': Boolean(getRandomInteger(0, 1))
  }
});

export {generateMovie};
