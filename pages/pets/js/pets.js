const headerBurger = document.querySelector('.header-burger');
const navMobile = document.querySelector('.nav-mobile');
const headerNavMobile = document.querySelector('.header-nav__mobile');
const navListItemActive = document.querySelectorAll('.nav-list__item--active');
const ourFriendsContainer = document.querySelector('.our-friends__container');
console.log(ourFriendsContainer);
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const container  = document.querySelector('.container');

const togleBurger = () => {
    if (headerBurger.classList.contains('active')) {
        headerBurger.classList.remove('active');
        navMobile.classList.remove('active');
        document.body.classList.remove('lock');
    } else {
        headerBurger.classList.add('active');
        navMobile.classList.add('active');
        document.body.classList.add('lock');
    }
}
//function for shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


headerBurger.addEventListener('click', togleBurger);

navMobile.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-list__item') && navMobile.classList.contains('active')) {
        navMobile.classList.remove('active');
        headerBurger.classList.remove('active');
        document.body.classList.remove('lock');
    }
});

navListItemActive[1].addEventListener('click', (e) => {
    console.log(e.target);
    navMobile.classList.remove('active');
    headerBurger.classList.remove('active');
    document.body.classList.remove('lock');
});

document.addEventListener('click', (e) => {
    if (
        !e.target.closest('.nav-list__item') &&
        navMobile.classList.contains('active') &&
        !e.target.closest('.header-burger')
    ) {
        navMobile.classList.remove('active');
        headerBurger.classList.remove('active');
        document.body.classList.remove('lock');
    }
});


class Slider {
    constructor(pets) {
        this.pets = pets;
        this.body = document.body;
        this.popup = document.querySelector('.popup');
        this.popupClose = document.querySelector('.popup__close');
        this.popupContent = document.querySelector('.popup__content');
    }

    createSlide(index) {
        const slide = document.createElement('div');
        const slideImg = document.createElement('div');
        const img = document.createElement('img');
        const slideTitle = document.createElement('div');
        const slideBtn = document.createElement('div');
        const slideLink = document.createElement('a');

        slide.className = 'slider-card';
        slideImg.className = 'slider-card__img';
        img.className = '';
        slideTitle.className = 'slider-card__title';
        slideBtn.className = 'slider-card__btn';
        slideLink.className = '';

        slideTitle.textContent = this.pets[index].name;
        slideLink.textContent = 'Learn more';

        img.src = this.pets[index].img;
        img.alt = this.pets[index].name;

        slide.appendChild(slideImg);
        slideImg.appendChild(img);
        slide.appendChild(slideTitle);
        slide.appendChild(slideBtn);
        slideBtn.appendChild(slideLink);
        slide.setAttribute('data-id', index);

        ourFriendsContainer.appendChild(slide);

        slide.addEventListener('click', (event) => {
            this.openPopup(event.currentTarget.getAttribute('data-id'))
        });

        slide.addEventListener('click', (event) => {
            this.popupClose.addEventListener('click', () => {
                this.closePopup();
            });
        });
        
        this.popup.addEventListener('click', (event) => {
            if (!event.target.closest('.popup__content')){
                this.closePopup();
            }
        });

        this.popup.addEventListener('mouseover', (event) => {
            if (!event.target.closest('.popup__content')) {
                this.popupClose.classList.add('hover');
            }
        });

        this.popupContent.addEventListener('mouseover', (event) => {
                this.popupClose.classList.remove('hover');
        });

        return slide
    }

    generateSlides() {
        let arrayOfindex = [0, 1, 2, 3, 4, 5, 6, 7];
        const currentSlideIndex = arrayOfindex.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 8; i++) {
            const slide = this.createSlide(currentSlideIndex[i]);
            ourFriendsContainer.appendChild(slide);
        }
    }

    generatePopup(index) {
        const popupImg = document.querySelector('.popup__img img');
        const popupTitle = document.querySelector('.popup__title');
        const popupSubtitle = document.querySelector('.popup__subtitle');
        const popupText = document.querySelector('.popup__text');

        popupImg.src = this.pets[index].img;
        popupImg.alt = this.pets[index].name;

        popupTitle.textContent = this.pets[index].name;
        popupSubtitle.textContent = `${this.pets[index].type} - ${this.pets[index].breed}`;
        popupText.textContent = this.pets[index].description;

        const age = document.querySelector('.age');
        const inoculations = document.querySelector('.inoculations');
        const diseases = document.querySelector('.diseases');
        const parasites = document.querySelector('.parasites');

        age.textContent = this.pets[index].age;
        inoculations.textContent = this.pets[index].inoculations.join(', ');
        diseases.textContent = this.pets[index].diseases.join(', ');
        parasites.textContent = this.pets[index].parasites.join(', ');
    }

    openPopup(index) {
        this.generatePopup(index);
        this.popup.classList.add('open');
        this.body.classList.add('lock');
    }

    closePopup() {
        this.popup.classList.remove('open');
        this.body.classList.remove('lock');
    }
}


async function getPets() {
    const response = await fetch('../../data/pets.json');
    const pets = await response.json();
    const slider = new Slider(pets);
    slider.generateSlides();
    // initSwiper();
    // slider.generateSlides()
}


getPets();