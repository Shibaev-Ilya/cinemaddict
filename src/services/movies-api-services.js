import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class MoviesApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `/movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (movie) => {
    const adaptedMovie = {...movie,
      /* eslint-disable */
      user_details: {
        watchlist: movie.userDetails.watchlist,
        already_watched: movie.userDetails.alreadyWatched,
        watching_date: movie.userDetails.watchingDate,
        favorite: movie.userDetails.favorite,
      },
      /* eslint-enable */
    };

    delete adaptedMovie.userDetails;

    return adaptedMovie;
  };

}
