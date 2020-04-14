import '../css/style.scss';
import * as Cards from './Dictionary';

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