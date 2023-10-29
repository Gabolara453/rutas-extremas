const $ = require('jquery');

// // Tamaño maximo del archivo
// const maxSize = 10000000; 
//
// // Obtener referencia al elemento
// const $miInput = document.querySelector("#input-field-img");
//
// $miInput.addEventListener("change", function () {
//     // si no hay archivos, regresamos
//     if (this.files.length <= 0) return;
//
//     // Validamos el primer archivo únicamente
//     const archivo = this.files[0];
//     if (archivo.size > maxSize) {
//         const tamanioEnMb = maxSize / 1000000;
//         alert(`El tamaño máximo es ${tamanioEnMb} MB`);
//         // Limpiar
//         $miInput.value = "";
//     } else {
//         // Validación pasada. Envía el formulario o haz lo que tengas que hacer
//     }
// });

// // https://parzibyte.me/blog
// const MAXIMO_TAMANIO_BYTES = 2000000; // 1MB = 1 millón de bytes
//
// // Obtener referencia al elemento
// const miInput = document.querySelector("#input-field-img");
//
// $(miInput).addEventListener("change", function () {
// 	// si no hay archivos, regresamos
// 	if (this.files.length <= 0) return;
//
// 	// Validamos el primer archivo únicamente
// 	const archivo = this.files[0];
// 	if (archivo.size > MAXIMO_TAMANIO_BYTES) {
// 		const tamanioEnMb = MAXIMO_TAMANIO_BYTES / 1000000;
// 		alert(`El tamaño máximo es ${tamanioEnMb} MB`);
// 		// Limpiar
// 		$(miInput).value = "";
// 	} else {
// 		// Validación pasada. Envía el formulario o haz lo que tengas que hacer
// 	}
// });

$(function(){
    $("input[type='submit']").click(function(){
        var $fileUpload = $("input[type='file']");
        if (parseInt($fileUpload.get(0).files.length)>2){
         alert("You can only upload a maximum of 2 files");
        }
    });    
});
