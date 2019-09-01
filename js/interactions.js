let moreInfoButton = document.getElementById('moreInfoButton');
moreInfoButton.addEventListener('click', () => {

    // Scroll to a certain element
    document.querySelector('.content').scrollIntoView({
        behavior: 'smooth'
    });
});