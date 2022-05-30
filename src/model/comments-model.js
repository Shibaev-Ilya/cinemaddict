import {generateComments} from '../mock/comments.js';

export default class CommentsModel {

  #comments = generateComments();

  get comments() {
    return this.#comments;
  }

}
