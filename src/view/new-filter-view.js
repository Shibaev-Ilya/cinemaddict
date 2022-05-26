import AbstractView from '../framework/view/abstract-view.js';

const createNewFilterTemplate = () => (
  `<ul class="sort">
    <li><a href="#" class="sort__button" data-sort-type="default">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="byDate">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="byRating">Sort by rating</a></li>
  </ul>`
);

export default class NewFilterView extends AbstractView {

  get template() {
    return createNewFilterTemplate();
  }

  setClickSortHandler = (callback) => {
    this._callback.clickSortButton = callback;
    this.element.addEventListener('click', this.#clickSortHandler);
  };

  #clickSortHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();

    if (evt.target.classList.contains('sort__button--active')) {
      evt.target.classList.remove('sort__button--active');
      this._callback.clickSortButton('default');
    } else {
      if (this.element.querySelector('.sort__button--active')) {
        this.element.querySelector('.sort__button--active').classList.remove('sort__button--active');
      }
      evt.target.classList.add('sort__button--active');
      this._callback.clickSortButton(evt.target.dataset.sortType);
    }
  };

}
