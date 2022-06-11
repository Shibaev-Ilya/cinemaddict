import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST : 'POST',
};

export default class CommentsApiService extends ApiService {

  getComments = (filmId) => {
    return this._load({url: `/comments/${filmId}`})
      .then(ApiService.parseResponse);
  };

  addComment = async (comment) => {
    const response = await this._load({
      url: `/comments/${comment.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

}
