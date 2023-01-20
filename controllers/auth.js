const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = response )=>{

    const { nombre, email, password} = req.body;

    try {

    //Verificar si no existe un correo igual
        const usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese email'
            });
        }

    //Crear usuario con el modelo
    const dbUser = new Usuario( req.body );


    // Encriptar password
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync( password, salt );

    //Generar JWT
        const token = await generarJWT( dbUser.id, dbUser.nombre );

    //Crear usuario de BD
    await dbUser.save();

    //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbUser.id,
            nombre,
            email,
            token
        })    



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        })
    }
};


const loginUsuario = async( req, res = response )=>{

    const { email, password} = req.body;
    

    try {
        
        const dbUser = await Usuario.findOne({ email });

        if( !dbUser ){
            return res.status(400).json({
                ok:false,
                msg:'El correo y/o el password no son correctos'
            });
        }

        //Confirmar si el password hace match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ){
            return res.status(400).json({
                ok:false,
                msg:'El correo y/o el password no son correctos'
            });
        }

        //Generar JWT
        const token = await generarJWT( dbUser.id, dbUser.nombre );

        //Generar respuesta exitosa
        return res.json({
            ok:true,
            uid: dbUser.id,
            nombre: dbUser.nombre,
            email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
};

const renewToken = async( req, res = response )=>{

    const {uid, nombre }= req;

    const dbUser = await Usuario.findOne({ uid });


     //Generar JWT
     const token = await generarJWT( uid, nombre );

    return res.json({
        ok:true,
        uid,
        nombre,
        email: dbUser.email,
        token
    })
};


module.exports= {
    crearUsuario,
    loginUsuario,
    renewToken
}