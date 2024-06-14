const { StatusCodes } = require("http-status-codes");
const { verifyToken } = require("../utils/auth");

const Authentication = (permission) => (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const accessToken = authHeader.split(' ')[1]; 
        if(!accessToken) return res.status(401).json({error: "Unauthorized"});
        try {
            const { userId, role } = verifyToken(accessToken);
            if(!permission.includes(role)) return res.status(StatusCodes.FORBIDDEN).json({error: "Method not allowed"}); 
            req.headers['x-userId'] = userId;
        }
        catch(err) {
            res.status(StatusCodes.UNAUTHORIZED).json();
        }
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = Authentication;