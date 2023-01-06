import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
const axios = require('axios').default;

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});

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

function createMarcup(hits) {
  const markup = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
  <a href= ${largeImageURL}>
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </div>`).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup)
}

function onInputValue(e) {
inputValue = e.target.value;
}

function onSubmitClick(e) {
e.preventDefault();
refs.gallery.innerHTML = '';
  
getImage(inputValue).then(({hits, totalHits}) => {
  if (inputValue.length > 0) {
    createMarcup(hits);
    Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
    setTimeout(() => {
    refs.loadMoreBtn.style.display = 'block';
    }, 200);
  } else {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    };
})
.catch(err => console.log(err));
page += 1;
}

function onLoadMoreBtnClick() {
  
  if (page > totalPages) {
    refs.loadMoreBtn.style.display = 'none';
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
    return
  } else {
    refs.loadMoreBtn.style.display = 'block';
    page = Number(page) + 1;
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