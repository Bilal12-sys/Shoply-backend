// Mkae User Api key
const userKey = "first_1224";

// Make user middleware
const User_middleware = (req, res, next) => {
    const key = req.query.apiKey;

    if (!key) {
        return res.status(401).send({status: 401, message: "API key is required" });
    }
    if (key !== userKey) {
        return res.status(401).send({  status: 401,  message: "Invalid API key"  });
    }
    next();
};

export default User_middleware;