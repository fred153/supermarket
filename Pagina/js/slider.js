
const sliderTimming = 1000;
const clickDelay = 3000;
const sliderConfig = [
    {
        slider: document.getElementById('slider-left'),
        images: ['Foto_3.jpg', 'Foto_2.jpg', 'Foto_3.jpg', 'Foto_2.jpg'],
    },
    {
        slider: document.getElementById('slider-right'),
        images: ['Foto_2.jpg', 'Foto_3.jpg', 'Foto_2.jpg', 'Foto_3.jpg', 'Foto_2.jpg', 'Foto_3.jpg', 'Foto_2.jpg',],
    }
];


sliderConfig.forEach(({ slider, images }) => {
    const sliderNav = slider.querySelector(".slider-nav");
    images.forEach((name) => {
        sliderNav.innerHTML += `
            <figure class="slider-item">
                <img src="./img/${name}" alt="${name}">
            </figure>
        `;
    });
});

const sliders = document.querySelectorAll(".slider-container").forEach((sliderContainer) => {
    const sliderNav = sliderContainer.querySelector(".slider-nav");
    const initialScholl = sliderContainer.scrollLeft;
    const sliderItems = [...sliderContainer.querySelectorAll(".slider-item")]
                            .map(({ offsetLeft }, _, [{offsetLeft: base}]) => offsetLeft - base)
                            .sort(( a ,  b ) => a - b);
    const sliderWidth = sliderItems.reduce((total, offsetWidth) => total + offsetWidth, 0);
    let scrollPosition = 0;
    let interval = 0;
    
    if (!sliderNav || !sliderItems.length || !sliderWidth) return
    
    const scrollToNextItem = () => {
        // Calcula la posición del siguiente item

        const nextItem = sliderItems.find(offsetLeft => offsetLeft > scrollPosition);
        const nextPosition = nextItem ? nextItem : sliderWidth;

        // Actualiza la posición del scroll
        sliderContainer.scrollLeft = nextPosition;
        scrollPosition = nextPosition;

        // Si llegamos al final, reiniciamos la posición del scroll
        if (scrollPosition >= sliderWidth) {
            sliderContainer.scrollLeft = initialScholl;
            scrollPosition = initialScholl;
        }
    }

    // Reinicia el intervalo cuando se hace click en un item de la navegación

    sliderContainer.addEventListener("click", (event) => {
        const element = (event.target.tagName.toLocaleLowerCase().includes('img')) ?
            event.target.parentElement : event.target;

        if (element.classList.contains("slider-item")) {
            const index = [...sliderNav.children].indexOf(element);
            sliderContainer.scrollLeft = sliderItems[index].offsetLeft;
            scrollPosition = sliderItems[index].offsetLeft;
            clearInterval(interval);
            setTimeout(() => {
                interval = setInterval(scrollToNextItem, sliderTimming);
            }, clickDelay)
        }
    });
    // Agrega un intervalo para desplazar automáticamente el slider
    interval = setInterval(scrollToNextItem, sliderTimming);
});