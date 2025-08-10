// service id: service_tibshdo
//template_bg8exvj
//public Id: 9K589kQH6Sy2SIAfp

function contact(event) {
    event.preventDefault();
    const loading = document.querySelector('.contact__overlay--loading');
    const success = document.querySelector('.contact__overlay--success');

    loading.classList += ' contact__overlay--visible';

    const serviceID = 'service_tibshdo';
    const templateId = 'template_bg8exvj';

    emailjs.sendForm(serviceID, templateId, event.target)
    .then(() => {
        loading.classList.remove('contact__overlay--visible')
        success.classList += ' contact__overlay--visible'
        console.log('It worked');
    }).catch (() => {
        loading.classList.remove('contact__overlay--visible');
        alert(
            "The email service is temporarily unavaliable. Please try latter."
        );
    })
    
    const contactForm = document.getElementById('contact__form');
    contactForm.reset(); // This is the key line to clear all inputs

    // setTimeout(() => {

    //     loading.classList.remove('contact__overlay--visible')
    //     success.classList += ' contact__overlay--visible'
    //     console.log("Time out and it worked!")

    // },500)
    
}



function toggleModal() {
    const ctlModal = document.querySelector('.header__modal');
    // ctlModal.style.display = 'flex';

    ctlModal.classList.toggle('header__modal--hidden')
    ctlModal.classList.toggle('header__modal--show')

    const modalAbout = document.querySelector('.modal__about');
    modalAbout.classList.remove('modal__about--hidden')

    const modalContact = document.querySelector('.modal__contact');
    modalContact.classList.remove('modal__contact--hidden');

    const header_nav = document.querySelector('.nav-row');
    header_nav.classList.toggle('hidden')

    const myIntroduce = document.querySelector('.my-introduce');
    myIntroduce.classList.toggle('hidden');

    const scrollIcon = document.querySelector('.scroll');
    scrollIcon.classList.toggle('hidden');
}

function closeToggle(){
    const ctlModal = document.querySelector('.header__modal');
    // ctlModal.style.display = 'none';
    ctlModal.classList.toggle('header__modal--show')
    ctlModal.classList.toggle('header__modal--hidden')

    const modalAbout = document.querySelector('.modal__about');
    modalAbout.classList += ' modal__about--hidden';
    
    const modalContact = document.querySelector('.modal__contact');
    modalContact.classList += ' modal__contact--hidden';

    const success = document.querySelector('.contact__overlay--success');
    success.classList.remove('contact__overlay--visible');

    const contactForm = document.getElementById('contact__form');
    contactForm.reset(); // This is the key line to clear all inputs

    const header_nav = document.querySelector('.nav-row');
    header_nav.classList.toggle('hidden')

    const myIntroduce = document.querySelector('.my-introduce');
    myIntroduce.classList.toggle('hidden');

    const scrollIcon = document.querySelector('.scroll');
    scrollIcon.classList.toggle('hidden');
}

function toggleBlackWhite() {
    document.body.classList.toggle('background__black');
}

function shapeMove(event) {
    const scalar = 1/20;
    const shapes = document.querySelectorAll('.shape')

    const x = event.clientX * scalar;
    const y = event.clientY * scalar;

    shapes.forEach((shape, idx) => {
        
        const boolInt = ((idx+1) % 2)? 1:-1;
        // console.log(x*boolInt,y*boolInt)
        shape.style.transform = `translate(${x*boolInt}px, ${y*boolInt}px)`;
        // transform = `translate(${iconX}px, ${iconY}px)`;
    });
}