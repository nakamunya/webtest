const imageSets = [
    { mov: 'image-set/20210523-A6X06569-hdr.mov', avif: 'image-set/20210523-A6X06569-hdr.avif', jpg: 'image-set/20210523-A6X06569-sdr.jpg' },
    { mov: 'image-set/20230722-A7_03428.mov', avif: 'image-set/20230722-A7_03428.avif', jpg: 'image-set/20230722-A7_03428.jpg' },
    // さらに画像セットを追加
];

let currentIndex = 0;

function isSafari() {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
}

function createVideoElement(src) {
    var video = document.createElement('video');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    var source = document.createElement('source');
    source.setAttribute('src', src);
    source.setAttribute('type', 'video/quicktime');
    video.appendChild(source);
    return video;
}

function createImageElement(src, alt) {
    var img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    return img;
}

function displayContent(isHDR, isSafariBrowser) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    imageSets.forEach((set, index) => {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');

        if (isHDR) {
            if (isSafariBrowser) {
                slide.appendChild(createVideoElement(set.mov));
            } else {
                slide.appendChild(createImageElement(set.avif, 'HDR Image'));
            }
        } else {
            slide.appendChild(createImageElement(set.jpg, 'SDR Image'));
        }

        content.appendChild(slide);
    });
}

function checkHDRSupport() {
    const hdrText = document.getElementById('hdrText');
    const isSafariBrowser = isSafari();
    const isHDR = window.matchMedia && window.matchMedia('(dynamic-range: high)').matches;

    if (isHDR) {
        hdrText.innerHTML = '<label><input type="checkbox" id="hdrToggle">HDR Display Supported</label>';
        displayContent(true, isSafariBrowser);

        const hdrToggle = document.getElementById('hdrToggle');
        hdrToggle.checked = true;
        hdrToggle.addEventListener('change', function() {
            displayContent(hdrToggle.checked, isSafariBrowser);
            initializeSwiper(); // Swiperの初期化
        });
    } else {
        hdrText.innerHTML = '<label>HDR Display Not Supported</label>';
        displayContent(false, isSafariBrowser);
        initializeSwiper(); // Swiperの初期化
    }
}

function initializeSwiper() {
    new Swiper('.swiper-container', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'slide',
        simulateTouch: true,
    });
}

window.onload = function() {
    checkHDRSupport();
    initializeSwiper(); // Swiperの初期化
}
