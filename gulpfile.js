const{src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));//requerimos de nuestras dependencias instaladas.

function css (done) {
    src("src/scss/**/*.scss") //Identificamos el archivo sass, en este caso, todos
        .pipe(sass()) // compilamos el archivo sass = const sass....
        .pipe(dest("build/css")) //almacenamos en disco
    

    done();//callback, que avisa a gulp que hemos terminado.
}

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

exports.tarea = tarea; //codigoNodeJS + nombre = función
//asi es como lo mandamos a llamar por consola con el comando "npx gulp tarea" (nombre de la variable gulp = , parte izquierda)
*/