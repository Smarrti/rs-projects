import '../css/style.scss';
import { cards } from './Dictionary';

const dictionary = cards;
const burgerButton = document.querySelector('.hamburger-menu');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');

function moveSidebar() {
	const hamburgerButton = document.querySelector('.hamburger');
	const sidebar = document.querySelector('.sidebar');
	hamburgerButton.classList.toggle('hamburger_active');
	sidebarWrapper.classList.toggle('sidebar-wrapper_active');
	sidebar.classList.toggle('sidebar_active');
}

function deleteContent() {
	document.querySelector('.main').innerHTML = '';
}

burgerButton.addEventListener('click', moveSidebar);
sidebarWrapper.addEventListener('click', moveSidebar);

function generateStartContent() {
	const mainContent = document.querySelector('.main');
	dictionary[0].forEach((category, index) => {
		const card = document.createElement('a');
		const cardWrapper = document.createElement('div');
		const cardImage = document.createElement('img');
		const cardText = document.createElement('p');

		card.dataset.category = category;

		card.setAttribute('href', '#');
		cardImage.setAttribute('src', dictionary[index + 1][0].image);

		card.classList.add('category-card', 'card', 'category');
		cardWrapper.classList.add('category-card__wrapper', 'category');
		cardImage.classList.add('category-card__image', 'category');
		cardText.classList.add('card__text', 'category');

		cardText.innerHTML = category;

		cardWrapper.append(cardImage);
		card.append(cardWrapper);
		card.append(cardText);
		mainContent.append(card);
	})
}

function createSidebarElement(tag, href, className, nameLink) {
	const link = document.createElement(tag);
	link.setAttribute('href', href);
	link.classList.add(className);
	link.innerHTML = nameLink;
	return link;
}

function generateSidebar() {
	const sidebar = document.querySelector('.sidebar');
	sidebar.append(createSidebarElement('a', '#', 'sidebar__link', 'Main Page'))
	dictionary[0].forEach((category) => {
		sidebar.append(createSidebarElement('a', '#', 'sidebar__link', category));
	});
}

function generateTrainMode(categoryId) {
	const mainContent = document.querySelector('.main');
	dictionary[categoryId].forEach((wordObject) => {
		const card = document.createElement('a');
		const cardFront = document.createElement('div');
		const cardWrapper = document.createElement('div');
		const cardImage = document.createElement('img');
		const cardTextRu = document.createElement('p');
		const cardTextEn = document.createElement('p');
		const cardRotate = document.createElement('div');

		card.setAttribute('href', '#');
		cardImage.setAttribute('src', wordObject.image);

		card.classList.add('word-card', 'card', 'cardElement');
		cardFront.classList.add('word-card_front', 'cardElement');
		cardWrapper.classList.add('word-card__wrapper', 'cardElement');
		cardImage.classList.add('word-card__image', 'cardElement');
		cardTextRu.classList.add('card__text', 'word-card__text', 'cardElement');
		cardTextEn.classList.add('card__text', 'word-card__text', 'word-card__translation', 'cardElement');
		cardRotate.classList.add('word-card__rotate', 'cardElement');

		cardTextEn.innerHTML = wordObject.word;

		cardWrapper.append(cardImage);
		cardFront.append(cardWrapper);
		cardFront.append(cardTextEn);

		const cardBack = document.createElement('div');
		cardBack.innerHTML = cardFront.innerHTML;
		cardBack.classList.remove('word-card_front');
		cardBack.classList.add('word-card_back');
		card.append(cardBack);
		cardBack.querySelector('.word-card__translation').innerHTML = wordObject.translation;

		cardFront.append(cardRotate);
		card.append(cardFront);

		mainContent.append(card);
	});
}

function rotateCard(card) {
	const cardFront = card.querySelector('.word-card_front');
	const cardBack = card.querySelector('.word-card_back');
	cardFront.classList.toggle('rotated-front');
	cardBack.classList.toggle('rotated-back');
}

deleteContent();
generateStartContent();
generateSidebar();

document.querySelector('body').addEventListener('click', (event) => {
	event.preventDefault();
	const { target, path, } = event;
	const textEvent = target.innerText;

	switch (true) {
		case target.classList.contains('word-card__rotate'):
			rotateCard(path[2]);
			break;
		case target.classList.contains('category'):
			for (let i = 0; i < path.length - 2; i += 1) {
				const tag = path[i];
				if (tag.classList.contains('category-card')) {
					deleteContent();
					generateTrainMode(dictionary[0].indexOf(tag.dataset.category) + 1);
				}	
			}
			break;
		case target.classList.contains('sidebar__link'):
			deleteContent();
			if (textEvent === 'Main Page') {
				generateStartContent();
			} else {
				generateTrainMode(dictionary[0].indexOf(textEvent) + 1);
			}
			break;
		default:
			break;
	}
});

document.querySelector('body').addEventListener('mouseout', (event) => {
	const { target, toElement } = event;
	if (target.classList.contains('cardElement') && toElement.classList.contains('main')) {
		rotateCard(target);
	}
})