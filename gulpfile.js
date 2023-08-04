const{src, dest, watch} = require("gulp");//funcionalidades de la libreria de Gulp.
const sass = require("gulp-sass")(require("sass"));//requerimos de nuestras dependencias instaladas.
const plumber = require("gulp-plumber") //Imporartamos otra dependencia, para que no interrumpa nuestro workflow

/*** COMPILAR EL ARCHIVO DE SASS CON 3 PASOS***/
function css (done) {
    src("src/scss/**/*.scss") //1. Identificamos el archivo sass, en este caso todos
        .pipe(plumber())//--iria primero para que no interrumpa nuestro workflow
        .pipe(sass()) //2. compilamos el archivo sass = const sass....
        .pipe(dest("build/css")) //3. almacenamos en disco
    

    done();//callback, que avisa a gulp que hemos terminado.
}

/*** Funcion para el watch ***/
function dev (done){ 
    watch("src/scss/**/*.scss", css) //1º la ruta del archivi, 2ª la funcion a ejecutar

    done();
}

exports.css = css;
exports.dev = dev;



/*
function tarea (done){
    console.log("Mi primer tarea");

    done();// el callback, hacemos referencia para saber que termino de ejecutar nuestra funcion 
}

exports.tarea = tarea; //codigoNodeJS + <nombre> = función
//asi es como mandamos a llamar por consola con el comando "npx gulp tarea" (tarea = exports.tarea)
*/