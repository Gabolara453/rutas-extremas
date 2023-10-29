import UsersRouters from '../routes/router.users.js'
import AuthRouters from '../routes/router.auth.js'
import PostRouters from '../routes/router.posts.js'
import CommentPost from '../routes/router.coments.js'
import express from 'express'
// import bodyParse from 'body-parse';
//import path from 'path'
import cors from 'cors'
import morgan from 'morgan'


class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;



        //Middlewares
        this.middlewares()

        // rutas
        this.routes();
    }



    middlewares(){
        //Cors
        this.app.use(cors())

        //Dev
        this.app.use(morgan('dev'))
        //Parse
        // this.app.use(bodyParse.json());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));



        // Directorio Publico
        //this.app.use('/',express.static('puntofibra'))
    }

    routes(){
        //this.app.use('/api/auth', require('../routes/auth.routes'));
        //this.app.use('/api',   require('../routes/administrar.routes')); /*registrar, buscar y modificar*/
        this.app.use('/auth', AuthRouters)
        this.app.use('/users', UsersRouters)
        this.app.use('/posts', PostRouters)
        this.app.use('/comments', CommentPost)
        // this.app.use(UsersRouters)

    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Working on :', this.port);
        })
    }

}

export default Server;
