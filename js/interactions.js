let moreInfoButton = document.getElementById('moreInfoButton');
moreInfoButton.addEventListener('click', () => {

    // Scroll to a certain element
    document.querySelector('.contentAbout').scrollIntoView({
        behavior: 'smooth'
    });
});