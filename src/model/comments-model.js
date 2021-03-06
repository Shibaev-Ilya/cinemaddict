import {generateComments} from '../mock/comments.js';
import Observable from '../framework/observable';

export default class CommentsModel extends Observable {

  #comments = generateComments();

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];
    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {

    const index = this.#comments.findIndex((comment) => comment.id.toString() === update.toString());
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

}
