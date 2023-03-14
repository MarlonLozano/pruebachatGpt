const $imagen = document.querySelector("#imagen"),
		$imagenPrevisualizar = document.querySelector("#imagenPrevisualizar");
	const comprimirImagen = (imagenComoArchivo, porcentajeCalidad) => {

		return new Promise((resolve, reject) => {
			const $canvas = document.createElement("canvas");
			const imagen = new Image();
			imagen.onload = () => {
				$canvas.width = imagen.width;
				$canvas.height = imagen.height;
				$canvas.getContext("2d").drawImage(imagen, 0, 0);
				$canvas.toBlob(
					(blob) => {
						if (blob === null) {
							return reject(blob);
						} else {
							resolve(blob);
						}
					},
					"image/jpeg",
					11 / 100
				);
			};
			imagen.src = URL.createObjectURL(imagenComoArchivo);
		});
	};

	document.querySelector("#btnComprimirDescargar").addEventListener("click", async () => {
		if ($imagen.files.length <= 0) {
			return;
		}
		const archivo = $imagen.files[0];
		const blob = await comprimirImagen(archivo, parseInt(11));
		const url = URL.createObjectURL(blob);
		const enlace = document.createElement("a");
		enlace.href = url;
		enlace.download = "Imagen comprimida.jpg";
		enlace.click();
	});