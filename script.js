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

    const set = imageSets[currentIndex];
    if (isHDR) {
        if (isSafariBrowser) {
            content.appendChild(createVideoElement(set.mov));
        } else {
            content.appendChild(createImageElement(set.avif, 'HDR Image'));
        }
    } else {
        content.appendChild(createImageElement(set.jpg, 'SDR Image'));
    }
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
        });
    } else {
        hdrText.innerHTML = '<label>HDR Display Not Supported</label>';
        displayContent(false, isSafariBrowser);
    }
}

function prevImage() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageSets.length - 1;
    const isSafariBrowser = isSafari();
    const isHDR = window.matchMedia && window.matchMedia('(dynamic-range: high)').matches;
    displayContent(isHDR, isSafariBrowser);
}

function nextImage() {
    currentIndex = (currentIndex < imageSets.length - 1) ? currentIndex + 1 : 0;
    const isSafariBrowser = isSafari();
    const isHDR = window.matchMedia && window.matchMedia('(dynamic-range: high)').matches;
    displayContent(isHDR, isSafariBrowser);
}

window.onload = function() {
    checkHDRSupport();
}
