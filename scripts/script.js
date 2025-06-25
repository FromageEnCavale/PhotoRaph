document.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById('scroll-container');

    async function fetchImages() {

        try {

            const res = await fetch('/api/images');

            let urls = await res.json();

            urls = urls.reverse();

            initGallery(urls);

        } catch (err) {

            console.error('Failed to load image list:', err);

        }

    }

    function initGallery(urls) {

        container.innerHTML = '';

        urls.forEach(url => {

            const div = document.createElement('div');

            div.className = 'img-container';

            const img = document.createElement('img');

            img.setAttribute('data-src', url);

            img.setAttribute('draggable', 'false');

            img.alt = 'img';

            div.appendChild(img);

            container.appendChild(div);

        });

        initSequentialLoading();

    }

    function initSequentialLoading() {

        const imgs = Array.from(document.querySelectorAll('img[data-src]'));

        let index = 0;

        const delay = 250;

        function loadNext() {

            if (index >= imgs.length) return;

            const img = imgs[index++];

            const src = img.dataset.src;

            img.src = src;

            img.addEventListener('load', () => {

                setTimeout(() => {

                    img.classList.add('loaded');

                    loadNext();

                }, delay);

            }, {once: true});

            img.addEventListener('error', () => {

                console.error(`Loading error for ${src}`);

                loadNext();

            }, {once: true});

        }

        loadNext();

    }

    fetchImages();

});