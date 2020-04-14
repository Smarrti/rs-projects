import '../css/style.scss';
import * as Cards from './Dictionary';
import './Content';

const dictionary = Cards.default.cards;
const burgerButton = document.querySelector('.hamburger-menu');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');

function moveSidebar() {
	const hamburgerButton = document.querySelector('.hamburger');
	const sidebar = document.querySelector('.sidebar');
	hamburgerButton.classList.toggle('hamburger_active');
	sidebarWrapper.classList.toggle('sidebar-wrapper_active');
	sidebar.classList.toggle('sidebar_active');
}

burgerButton.addEventListener('click', moveSidebar);
sidebarWrapper.addEventListener('click', moveSidebar);

function deleteContent() {
	document.querySelector('.main').innerHTML = '';
}

function generateStartContent() {
	const mainContent = document.querySelector('.main');
	dictionary[0].forEach((category, index) => {
		const card = document.createElement('a');
		const cardWrapper = document.createElement('div');
		const cardImage = document.createElement('img');
		const cardText = document.createElement('p');

		card.setAttribute('href', '#');
		cardImage.setAttribute('src', dictionary[index + 1][0].image);

		card.classList.add('category-card', 'card');
		cardWrapper.classList.add('card__wrapper');
		cardImage.classList.add('card__image');
		cardText.classList.add('card__text');

		cardText.innerHTML = category;

		cardWrapper.append(cardImage);
		card.append(cardWrapper);
		card.append(cardText);
		mainContent.append(card);
	})
}

function generateSidebar() {
	const sidebar = document.querySelector('.sidebar');
	dictionary[0].forEach((category) => {
		const link = document.createElement('a');
		link.setAttribute('href', '#');
		link.classList.add('sidebar__link');
		link.innerHTML = category;
		sidebar.append(link);
	});
}

	deleteContent();
	generateStartContent();
	generateSidebar()