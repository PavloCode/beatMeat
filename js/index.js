'use strict';
(() => {
    const burgerBt = document.querySelector('.js-burger-button');
    const burgerMenu = document.querySelector('.js-burger-menu');
    const mySkillsBtn = document.querySelector('.js-my-skills');
    const mySkillsPannel = document.querySelector('.my-skills-list-2');
    const switchButton = document.querySelector('.js-switch');
    const panelEducation = document.querySelector('.experience-list');
    const panelWork = document.querySelector('.experience-list-2');

    const animationTop = document.querySelector('.js-burger-top');
    const animationMiddle = document.querySelector('.js-burger-middle');
    const animationBottom = document.querySelector('.js-burger-bottom');

    burgerBt.addEventListener('click', openMenu);
    burgerMenu.addEventListener('click', openLink);
    mySkillsBtn.addEventListener('click', openSkills);
    switchButton.addEventListener('click', switchActive);
    // burger menu
    function openMenu(e) {
        burgerMenu.classList.toggle('active');
        // animation
        animationTop.classList.toggle('animation-top');
        animationMiddle.classList.toggle('animation-mid');
        animationBottom.classList.toggle('animation-bot');
        //block sckroll
        if (burgerMenu.classList.contains('active')) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }
    // navigation
    function openLink(e) {
        const target = e.target;
        if (target.nodeName !== "A") return;
        burgerMenu.classList.toggle('active');
        // animation
        animationTop.classList.toggle('animation-top');
        animationMiddle.classList.toggle('animation-mid');
        animationBottom.classList.toggle('animation-bot');
        //avalible scroll
        document.body.style.overflow = "";
    }
    // smooth scrolling to all links
    $(document).ready(function() {
        $("a").on('click', function(event) {
            if (this.hash !== "") {
                event.preventDefault();
                const hash = this.hash;
                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 1500, function() {
                    window.location.hash = hash;
                });
            }
        });
    });
    // skills section
    function openSkills(e) {
        mySkillsPannel.classList.toggle('my-skills-list-active')
        mySkillsPannel.classList.add('vivify', 'fadeIn')
    }

    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('my-skills-list-progress-animation');
            }
        });
    }

    let options = {
        threshold: [0.5]
    };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.my-skills-list-progress');

    for (let elm of elements) {
        observer.observe(elm);
    }

    // switch
    function switchActive(e) {
        panelEducation.classList.toggle('experience-list-block');
        panelWork.classList.toggle('experience-list-active');
        panelWork.classList.add('vivify', 'fadeIn')
        panelEducation.classList.add('vivify', 'fadeIn')


    }

    const listCell = document.querySelector('.cercle-list');
    listCell.addEventListener('click', eventFunction);

    function eventFunction(event) {
        const target = event.target;
        if (event.target.className !== 'cercle-item') return;
        const number = Number(target.getAttribute('data-ceil'));
        checkCard(number);
    }

    // slider
    const count = 1;
    const array = Array.from(document.querySelectorAll('.cercle-item'));
    const list = carousel.querySelector('ul');
    const listElems = carousel.querySelectorAll('li');
    let position = 0;

    function checkCard(value) {
        const css = document.getElementById('card-width');
        const widthInt = parseInt(window.getComputedStyle(css).width);
        const width2 = widthInt + 30;

        let number = value - 1;
        const prevCercle = document.querySelector('.cercle-item-checked');
        prevCercle.classList.remove('cercle-item-checked');
        array[number].classList.add('cercle-item-checked');

        position -= width2 * number;
        position = Math.max(position, -width2 * (listElems.length - count));
        list.style.marginLeft = position + 'px';
        position = 0;
    }


    // Get the form.
    const form = $('#contact-form');

    // Get the messages div.
    const formMessages = $('.form-messege');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        const formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // Make sure that the formMessages div has the 'success' class.
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                // Set the message text.
                $(formMessages).text(response);

                // Clear the form.
                $('#contact-form input,#contact-form textarea').val('');
            })
            .fail(function(data) {
                // Make sure that the formMessages div has the 'error' class.
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');

                // Set the message text.
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! Your message could not be sent.');
                }
            });
    });

})();