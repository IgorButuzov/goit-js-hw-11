export {createMarcup}

const gallery = document.querySelector('.gallery');

function createMarcup(hits) {
  const markup = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
  <a href= ${largeImageURL}>
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b class="info-item-text">Likes</b><span class="info-item-res">${likes}</span>
    </p>
    <p class="info-item">
      <b class="info-item-text">Views</b><span class="info-item-res">${views}</span>
    </p>
    <p class="info-item">
      <b class="info-item-text">Comments</b><span class="info-item-res">${comments}</span>
    </p>
    <p class="info-item">
      <b class="info-item-text">Downloads</b><span class="info-item-res">${downloads}</span>
    </p>
  </div>
  </div>`).join('');
  gallery.insertAdjacentHTML('beforeend', markup)
};