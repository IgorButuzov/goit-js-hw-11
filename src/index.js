import { lightbox } from "./js/simplelightbox";
import { createMarcup } from "./js/create_marcup";

import Notiflix from 'notiflix';
const axios = require('axios').default;

const refs = {
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('.search-form'),
  searchInput: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more-btn')
};
 
refs.searchBtn.addEventListener('submit', onSubmitClick);
refs.searchInput.addEventListener('input', onInputValue);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32625337-c016256a0573a5e098b27062e';
let page = 1;
let inputValue = '';
let totalPages = undefined;
const perPage = 40;

async function getImage() {
  try {
const response = await axios.get(`${BASE_URL}?
key=${KEY}&
q=${inputValue}&
image_type=photo&
orientation=horisontal&
safesearch=true&
page=${page}&
per_page=40`);
      return response.data;
  } catch (error) {
    console.error(error);
  }
};

function onInputValue(e) {
inputValue = e.target.value;
}

function onSubmitClick(e) {
e.preventDefault();
refs.gallery.innerHTML = '';
page = 1;
getImage(inputValue).then(({hits, totalHits}) => {
  if (inputValue.length > 0 && totalHits > 0) {
    createMarcup(hits);
    Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
    lightbox.refresh();
    setTimeout(() => {
    refs.loadMoreBtn.style.display = 'block';
    }, 200);
  } else {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      refs.loadMoreBtn.style.display = 'none';
  };
})
.catch(err => console.log(err));

}

function onLoadMoreBtnClick() {
  
  if (page > totalPages) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    return
  } else {
    refs.loadMoreBtn.style.display = 'block';
    page += 1;
    getImage(inputValue)
      .then(({ hits, totalHits }) => {
        if (hits.length > 0) {
          createMarcup(hits)
          paginationLoadMore(totalHits)
          lightbox.refresh();
      }
    })
  }
};

function paginationLoadMore(totalHits) {
  totalPages = Math.floor((totalHits > 200 ? 200 : totalHits) / perPage)
}