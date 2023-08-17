document.addEventListener('DOMContentLoaded', function () {
    inciarApp();
})

function inciarApp() {
    crearGaleria();
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/pequeña/${i}.avif" type="image/avif">
        <source srcset="build/img/pequeña/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/pequeña/${i}.jpg"
            alt="Imagen galeria"> <!-- fallback -->
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(index){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${index}.avif" type="image/avif">
    <source srcset="build/img/grande/${index}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${index}.jpg"
        alt="Imagen galeria"> <!-- fallback -->
    `;
    //Creando Overlay con la imagen
    const overlay = document.createElement('DIV');//oscurecemos un poco la pantalla de fondo.
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function (){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    //Añadiendo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);//asi mostramos en el body la imagen
    body.classList.add('fijar-body');
}