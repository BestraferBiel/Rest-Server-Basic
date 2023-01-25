const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config.db');


class Server {


    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";

        // Conectar a la base de datos 
        this.conectarDb();


        // Middlewares
        this.middlewere();


        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDb() {

        await dbConection();


    }

    middlewere() {

        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static("public"))
    }

    routes() {

        this.app.use(this.usuariosPath, require("../routes/user.routes"))
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log("Server corriendo en puerto", this.port);


        });
    }


}

module.exports = Server;