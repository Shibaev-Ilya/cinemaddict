import Observable from '../framework/observable';
import {ActionType} from "../utils";

export default class CommentsModel extends Observable {

  #commentsApiService = null;
  #comments = [];

  constructor (commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  getComments = async (updateType, movieId) => {
console.log(movieId);
    try {
      this.#comments = await this.#commentsApiService.getComments(movieId);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(updateType, this.#comments);

  };

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
