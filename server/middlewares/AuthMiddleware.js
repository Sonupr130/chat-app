import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY); // Debugging

    const token = req.cookies.jwt;
    console.log("Received Token:", req.cookies.jwt);

    if (!token) {
        return res.status(401).send("You are not authenticated!");
    }
    

    console.log("Received Token:", token);

    try {
        const decoded = jwt.decode(token);
        console.log("Decoded Token:", decoded); // Debugging
    } catch (error) {
        console.error("Error decoding token:", error);
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
            return res.status(403).send("Token is invalid!");
        }

        console.log("Payload from JWT:", payload);

        req.userId = payload.userId;
        next();
    });
};
