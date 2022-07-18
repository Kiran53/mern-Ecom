const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    
    const token = req.cookies.token
    
    // Check for token
    if(!token){
        return res.status(400)
    }
    else{

        try{
            // Verify token
            const decoded = jwt.verify(token, process.env.jwtsecret);
            //Add user from payload
            req.user = decoded;
        next();
        } catch(e){
            res.status(400).json({ msg:'Token is not valid'});
        }
    }
}

module.exports = auth;