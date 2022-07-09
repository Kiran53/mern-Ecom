const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    
    const token = req.cookies.token
    
    // Check for token
    if(!token){
        // console.log("middleware wrong token")
        req.user ="400" 
        next()
    }
    else{

        try{
            // Verify token
            const decoded = jwt.verify(token, config.get('jwtsecret'));
            //Add user from payload
            req.user = decoded;
        next();
        } catch(e){
            res.status(400).json({ msg:'Token is not valid'});
        }
    }
}

module.exports = auth;