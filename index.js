/* global document fetch */

const modalImages = (el, ind) => `
    <div class="img-cont ${el.checked ? 'img-cont--checked' : ''}">
        <div class="img-popup">Click to chose</div>
        <img data-order=${ind} src="${el.url}" alt="Panda" />
    </div>
`;

const customerImages = el => `
    <div class="img-cont-customer">
        <img src="${el.url}" alt="Animal" />
    </div>         
`;

// Main class
class Customer {
  constructor(links) {
    this.links = links;
  }

  init() {
    //Defining button variables
    const backdrop = document.querySelector('.backdrop');
    const showModalBtn = document.getElementById('js-show-modal');
    //render list of images for modal dialog
    const modalWrapper = document.querySelector('.modal-wrapper');
    const modalContent = document.querySelector('.modalContent');

    modalContent.innerHTML = this.links
      .map((elem, ind) => modalImages(elem, ind))
      .join('');

    //Show modal dialog
    showModalBtn.addEventListener('click', () => {
      modalWrapper.classList.add('modal-wrapper--visible');
    });

    //Close modal on backdrop click
    backdrop.addEventListener('click', () => {
      modalWrapper.classList.toggle('modal-wrapper--visible');
    });

    //get all images click handling
    const imageCont = document.querySelectorAll('.img-cont');

    // adding click handler on images
    imageCont.forEach(el => {
      el.addEventListener('click', e => {
        const order = e.target.dataset.order;
        if (el.classList.contains('img-cont--checked')) {
          this.remove(order);
        } else {
          this.add(order);
        }
        el.classList.toggle('img-cont--checked');
      });
    });

    // Mark images as chacked
    const addImagesBtn = document.getElementById('js-add-images');

    addImagesBtn.addEventListener('click', () => {
      modalWrapper.classList.toggle('modal-wrapper--visible');
      this.render();
    });
  }

  render() {
    //Get customers image container
    const cont = document.querySelector('.choose-img');

    //Clear previous result
    cont.innerHTML = '';

    //Render Checked images
    cont.innerHTML = this.links
      .map(elem => {
        if (elem.checked) {
          return customerImages(elem);
        }
      })
      .join('');
  }

  add(order) {
    this.links[order].checked = true;
  }

  remove(order) {
    this.links[order].checked = false;
  }
}

// Fetch Links and start App
fetch('./images.json')
  .then(res => res.json())
  .then(res => {
    const customer = new Customer(res.images);
    // App initializing
    customer.init();
  });
