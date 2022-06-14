import Observable from '../framework/observable';

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

  getComments = async (filmId) => {

    try {
      this.#comments = await this.#commentsApiService.getComments(filmId);
    } catch(err) {
      this.#comments = [];
    }

    return this.comments;

  };


  addComment = async (updateType, comment) => {
    try {
      this.#comments = await this.#commentsApiService.addComment(comment);
    } catch(err) {
      this.#comments = [];
    }

    return this.comments;

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
