// Make product Api
const productKey = "first_2448"

// Mkae product middleware
const product_middleware = (req, res, next) => {
    const key = req.query.apiKey;

    if (!key) {
        return res.status(401).send({status: 401, message: "API key is required" });
    }
    if (key !== productKey) {
        return res.status(401).send({  status: 401,  message: "Invalid API key"  });
    }
    next();
};

export default product_middleware;