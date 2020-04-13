import '../css/style.scss';

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