const { src, dest, watch, parallel } = require('gulp');//funcionalidades de la libreria de Gulp, require("gulp") = lo extraemos

//DEPENDENCIAS
//CSS
const sass = require('gulp-sass')(require('sass'));//requerimos de nuestras dependencias instaladas.
const plumber = require('gulp-plumber') //Imporartamos otra dependencia, para que no interrumpa nuestro workflow
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps')

//Imagenes
const webp = require('gulp-webp'); //extencion webp
const imagemin = require('gulp-imagemin'); //comprimidor de imagenes
const cache = require('gulp-cache');
const avif = require('gulp-avif');

//JavaScript
const terser = require('gulp-terser-js'); 


/*** COMPILAR EL ARCHIVO DE SASS CON 3 PASOS***/
function css(done) {
    src("src/scss/**/*.scss") //1. Identificamos el archivo sass, en este caso todos
        .pipe(sourcemaps.init())
        .pipe(plumber())//--iria primero para que no interrumpa nuestro workflow
        .pipe(sass()) //2. compilamos el archivo sass = const sass....
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css')) //3. almacenamos en disco

    done();//callback, que avisa a gulp que hemos terminado.
}

/*** Funcion para el watch ***/
function javaScript (done){
    src("src/js/**/*.js")
      /*.pipe(sourcemaps.init()) //minificamos el codigo JS
        .pipe(terser())
        .pipe(sourcemaps.write('.')) */
        .pipe(dest("build/js"));

    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css); //1º la ruta del archivo, 2ª la funcion a ejecutar
    watch("src/js/**/*.js", javaScript);

    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")  //1.todos los archivos con extencion png y jpg
        .pipe(webp(opciones)) //2.
        .pipe(dest("build/img")) //3.
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src("src/img/**/*.{png,jpg}") //1.
        .pipe(cache(imagemin(opciones))) //2.
        .pipe(dest("build/img")) //3.
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")  
        .pipe(avif(opciones)) 
        .pipe(dest("build/img"))
    done();
}


exports.css = css;
exports.js = javaScript;
exports.versionWebp = versionWebp;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.dev = parallel(versionWebp, imagenes, versionAvif, javaScript, dev);


/*
function tarea (done){
    console.log("Mi primer tarea");

    done();// el callback, hacemos referencia para saber que termino de ejecutar nuestra funcion 
}

exports.tarea = tarea; //codigoNodeJS + <nombre> = función
//asi es como mandamos a llamar por consola con el comando "npx gulp tarea" (tarea = exports.tarea)
*/