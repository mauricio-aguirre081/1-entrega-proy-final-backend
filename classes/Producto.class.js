const fs = require("fs");

export default class Producto {
	
	static productos = [];
	constructor() {
		this.id = 0 ;
	}

	listar(id) {
		let producto = Producto.productos.find((prod) => prod.id == id);
		return producto || { error: "producto no encontrado" };
		async function getById(id) {
		const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id == id);
        return JSON.parse(productoBuscado);
		}
		getById();
		
	}

	listarAll() {
		return Producto.productos.length
			? Producto.productos
			: { error: "no hay productos cargados" };
			async function getAll() {
				try {
					const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
					return JSON.parse(contenido);
				} catch (errorGetAll) {
					console.log(errorGetAll);
				}
			} 
			getAll();
	}

	guardar(prod) {
		prod.id = ++this.id;
		prod.timeStamp = Date.now();
		Producto.productos.push(prod);
		return prod;
		async function saveNew(productoNuevo) {
			const contenido = await this.getAll();
        	const indice = contenido.sort((a,b) => b.id - a.id)[0].id;
        	productoNuevo.id = indice + 1;
        	contenido.push(productoNuevo);
        	return this.save(contenido);
		}
		saveNew();
	}

	actualizar(prod, id) {
		prod.id = Number(id);
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		Producto.productos.splice(index, 1, prod);
		async function update(producto) {
			try{
				await fs.promises.writeFile("./productos.txt", JSON.stringify(producto,null,2), "utf-8" );
			} catch (errorContenedor){
				console.log(errorContenedor)
			}
			update();
		}

	}

	borrar(id) {
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		return Producto.productos.splice(index, 1);
		async function deleteById(id) {
			const contenido = await this.getAll();
        	const productoEliminado = contenido.filter((producto) => producto.id !== id);
        	productoEliminado = fs.promises.appendFile("/productos.txt", "utf-8")
        	console.log(productoEliminado);
		}
		deleteById();
	}
}
