"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e )=> {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            
            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const object = {};

            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

    async function getResponse() {
        let response = await fetch('./posts.json');
        let content = await response.json();

        let list = document.querySelector('.posts');

        let key;
        for (key in content) {
            list.innerHTML += `
            <li class="post">
                <h4 class="post__title">${content[key].news}</h4>
                <h3 class="post__subtitle">${content[key].preview}</h3>
                <img src="${content[key].url}" alt="" class="post__photo" width="300">
            </li>   
            `

        }
    }
    getResponse();

    const title = document.querySelector('#formTitle'),
          preview = document.querySelector('#formPreview'),
          photo = document.querySelector('.file__input'),
          btn = document.querySelector('#button'),
          list = document.querySelector('.posts');

    btn.addEventListener('click', () => {
        return (
            list.innerHTML += `
            <li class="post">
                <h4 class="post__title">${title.value}</h4>
                <h3 class="post__subtitle">${preview.value}</h3>
                <img src="${photo.file}" alt="" class="post__photo" width="300">
            </li>   
            `
        );
    });

    
});