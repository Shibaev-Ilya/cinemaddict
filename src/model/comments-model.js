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
    let updatedComments;
    try {
      updatedComments = await this.#commentsApiService.addComment(comment);
      this.#comments = updatedComments.comments;

    } catch(err) {
      this.#comments = [];
    }

    this._notify(updateType, {
      movie: this.#adaptToClient(updatedComments.movie),
      comments: updatedComments.comments
    });
    return this.comments;

  };

  deleteComment = async (updateType, data) => {

    const index = this.comments.findIndex((comment) => comment.id === data.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(data.id);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
    this._notify(updateType, data);
    return this.comments;
  };

  #adaptToClient = (movie) => {
    const adaptedMovie = {...movie,
      userDetails: {
        watchlist: movie['user_details']['watchlist'],
        alreadyWatched: movie['user_details']['already_watched'],
        watchingDate: movie['user_details']['watching_date'],
        favorite: movie['user_details']['favorite'],
      },

    };

    delete adaptedMovie['user_details'];

    return adaptedMovie;
  };

}
