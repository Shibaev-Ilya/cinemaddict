import {getRandomInteger} from '../utils.js';
import {nanoid} from 'nanoid';

const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur corporis eligendi eum in molestias, numquam officia porro quae? Consectetur cum cumque, ea laborum perferendis perspiciatis ratione reprehenderit sit sunt tempora.';

const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const words = text.split(' ');

const getCommentData = (id, comment) => ({
  'id': id,
  'author': 'Ilya O\'Reilly',
  'comment': `${id} ${comment}`,
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': emotions[getRandomInteger(0, emotions.length -1)]
});

const generateComments = () => {
  const comments = {};

  for (let i = 0; i <= 20; i++) {
    const comment = words.slice(0, getRandomInteger(0, words.length - 1 )).join(' ');
    comments[i] = [getCommentData(nanoid(5), comment), getCommentData(nanoid(5), comment), getCommentData(nanoid(5), comment)];
  }

  return comments;
};

export {generateComments};
