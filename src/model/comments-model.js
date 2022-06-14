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
      const updatedComments = await this.#commentsApiService.addComment(comment);
      this.#comments = updatedComments.comments;

    } catch(err) {
      this.#comments = [];
    }

    return this.comments;

  };

  deleteComment = async (updateType, deletedCommentId) => {

    const index = this.comments.findIndex((comment) => comment.id === deletedCommentId);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(deletedCommentId);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

    } catch(err) {
      throw new Error('Can\'t delete comment');
    }

    return this.comments;
  };

}
