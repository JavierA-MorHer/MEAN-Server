const jtw = require('jsonwebtoken');


const generarJWT = ( uid, nombre )=>{
    
    const payload = {uid, nombre};

    return new Promise( (resolve, reject) => {
        jtw.sign( payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'24h'
        }, (err, token)=>{
    
            if(err){
                //Todo mal
                console.log(err)
                reject( err );
            }else{
                //Todo ok
                resolve(token);
            }
        })
    })
}

module.exports= {
    generarJWT
}

