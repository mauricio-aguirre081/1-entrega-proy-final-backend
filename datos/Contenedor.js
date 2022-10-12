const fs = require("fs");

class Contenedor {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        
    }
    async save(producto) {
        try{
            await fs.promises.writeFile("./productos.txt", JSON.stringify(producto,null,2), "utf-8" );
        } catch (errorContenedor){
            console.log(errorContenedor)
        }
    }

    async getAll() {
        try{
            const contenido = await fs.promises.readFile("./productos.txt", "utf-8")
            return JSON.parse(contenido);
        } catch (errorGetAll){
            console.log(errorGetAll);
        }
    }
    async saveNew(productoNuevo) {
        const contenido = await this.getAll();
        const indice = contenido.sort((a,b) => b.id - a.id)[0].id;
        productoNuevo.id = indice + 1;
        contenido.push(productoNuevo);
        return this.save(contenido);
    }
    async getById(id) {
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter((producto) => producto.id == id);
        return JSON.parse(productoBuscado);
    }
    async deleteById(id) {
        const contenido = await this.getAll();
        const productoEliminado = contenido.filter((producto) => producto.id !== id);
        productoEliminado = fs.promises.appendFile("/productos.txt", "utf-8")
        console.log(productoEliminado);
    }
    async deleteAll() {
        const contenido = await this.getAll();
        const todoeliminado = contenido.length(0);
        todoeliminado = fs.promises.writeFile("./productos.txt", "utf-8")
        //contenido.splice(0, contenido.length);
        console.log(todoeliminado);
    }


}

const contenedor = new Contenedor();

//contenedor.getAll();

const productoNuevo = {                                   
    title: 'Mochila',       
    price: 500.45,                                                                                   
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-256.png',                                     
    id: 1                                                                                         
    }

contenedor.saveNew(productoNuevo);