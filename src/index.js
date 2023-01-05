import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
const axios = require('axios').default;
// console.log(SimpleLightbox);
// console.log(Notify);
// console.log(Confirm);
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form');

searchBtn.addEventListener('submit', onSubmitClick)
searchInput.addEventListener('input', onInputValue)

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32625337-c016256a0573a5e098b27062e';
let page = 1;


async function getImage() {
  try {
const response = await axios.get(`${BASE_URL}?
key=${KEY}&
q=cat&
image_type=photo&
orientation=horisontal&
safesearch=true&
page=${page}&
per_page=40`);
      return response;
  } catch (error) {
    console.error(error);
  }
};

function createMarcup(arr) {
  const markup = arr.map((item) => `<div class="photo-card">
  <img src=${item.webformatURL} alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${item.comment}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
  </div>`).join('');
  gallery.insertAdjacentHTML('beforeend', markup)
}

function onInputValue(e) {
inputValue = e.target.value;
}

function onSubmitClick(e) {
e.preventDefault();

getImage().then(r => Object.values(r.data.hits))
.then(galleryMarkup => {
createMarcup(galleryMarkup)
})
.catch(err => console.log(err));
page += 1;
}


