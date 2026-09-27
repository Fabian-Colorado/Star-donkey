/* =========================
   GALLERY
========================= */

const gallery = document.querySelector(".gallery");

const galleryTrack =
    document.querySelector(".gallery-track");

const galleryItems =
    document.querySelectorAll(".gallery-item");

const previousButton =
    document.querySelector("#prev-button");

const nextButton =
    document.querySelector("#next-button");

const galleryCounter =
    document.querySelector("#gallery-counter");


let currentIndex = 0;



/* =========================
   ITEMS PER VIEW
========================= */

function getItemsPerView() {

    if (window.innerWidth <= 700) {

        return 1;

    }

    return 3;

}



/* =========================
   UPDATE GALLERY
========================= */

function updateGallery() {

    if (
        !galleryTrack ||
        galleryItems.length === 0
    ) {

        return;

    }


    const itemsPerView =
        getItemsPerView();


    const maxIndex =
        galleryItems.length - itemsPerView;


    if (currentIndex > maxIndex) {

        currentIndex = maxIndex;

    }


    const targetItem =
        galleryItems[currentIndex];


    galleryTrack.style.transform =
        `translateX(-${targetItem.offsetLeft}px)`;


    galleryCounter.textContent =
        `${currentIndex + 1} / ${galleryItems.length}`;

}



/* =========================
   NEXT
========================= */

function nextImage() {

    const itemsPerView =
        getItemsPerView();


    const maxIndex =
        galleryItems.length - itemsPerView;


    if (currentIndex < maxIndex) {

        currentIndex++;

    } else {

        currentIndex = 0;

    }


    updateGallery();

}



/* =========================
   PREVIOUS
========================= */

function previousImage() {

    const itemsPerView =
        getItemsPerView();


    const maxIndex =
        galleryItems.length - itemsPerView;


    if (currentIndex > 0) {

        currentIndex--;

    } else {

        currentIndex = maxIndex;

    }


    updateGallery();

}



/* =========================
   BUTTONS
========================= */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        previousImage
    );

}


if (nextButton) {

    nextButton.addEventListener(
        "click",
        nextImage
    );

}



/* =========================
   SWIPE EN MOVIL
========================= */

let touchStartX = 0;

let touchEndX = 0;



if (galleryTrack) {

    galleryTrack.addEventListener(
        "touchstart",
        function(event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    galleryTrack.addEventListener(
        "touchend",
        function(event) {

            touchEndX =
                event.changedTouches[0].screenX;


            const distance =
                touchEndX - touchStartX;


            if (
                Math.abs(distance) < 50
            ) {

                return;

            }


            if (distance < 0) {

                nextImage();

            } else {

                previousImage();

            }

        },
        {
            passive: true
        }
    );

}



/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    function() {

        updateGallery();

    }
);



/* =========================
   START
========================= */

updateGallery();
