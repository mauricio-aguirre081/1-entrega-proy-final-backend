import Producto from "./Producto.class.js";
const fs = require("fs");

export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.id = 1;
	}

	listar(id) {
		let prod = this.carritos.find((carr) => carr.id == id);
		return prod || { error: "carrito no encontrado" };
		async function getById(id) {
			const contenido = await this.getAll();
			const carritoBuscado = contenido.filter((carrito) => carrito.id == id);
			return JSON.parse(carritoBuscado);
			}
			getById();
	}

	listarAll() {
		return this.carritos.length
			? this.carritos
			: { error: "no hay carritos cargados" };
			async function getAll() {
				try {
					const contenido = await fs.promises.readFile("./carritos.txt", "utf-8");
					return JSON.parse(contenido);
				} catch (errorGetAll) {
					console.log(errorGetAll);
				}
			} 
			getAll();
	}

	crearCarrito() {
		const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
		this.carritos.push(carr);
		return carr;
		async function save(carrito) {
			try{
				await fs.promises.writeFile("./carritos.txt", JSON.stringify(carrito,null,2), "utf-8" );
			} catch (errorContenedor){
				console.log(errorContenedor)
			}
		}
		save();
	}

	guardarProductoEnCarrito(idProd, idCarrito) {
		console.log(idProd);
		const producto = this.producto.listar(idProd);
		this.carritos.forEach((carro) => {
			carro.id == idCarrito ? carro.productos.push(producto) : null;
		});
		return this.carritos;
		async function saveProdInCarrito(idProd, idCarrito) {
			try{
				await fs.promises.writeFile("./carritos.txt", JSON.stringify(carrito,null,2), "utf-8" );
			} catch (errorProdCarrito){
				console.log(errorProdCarrito)
			}
		}
		saveProdInCarrito();
	}

	actualizar(carr, id) {
		carr.id = Number(id);
		let index = this.carritos.findIndex((carr) => carr.id == id);
		this.productos.splice(index, 1, carr);
		async function update(carrito) {
			try{
				await fs.promises.writeFile("./carritos.txt", JSON.stringify(carrito,null,2), "utf-8" );
			} catch (errorContenedor){
				console.log(errorContenedor)
			}
			update();
		}
	}

	borrar(id) {
		let index = this.carritos.findIndex((carr) => carr.id == id);
		return this.carritos.splice(index, 1);

		async function deleteById(id) {
			const contenido = await this.getAll();
        	const carritoEliminado = contenido.filter((carrito) => carrito.id !== id);
        	carritoEliminado = fs.promises.appendFile("/carritos.txt", "utf-8")
        	console.log(productoEliminado);
		}
		deleteById();
	}
}
