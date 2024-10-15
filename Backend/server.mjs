import https from "https";
import fs from "fs";
import posts from "./routes/post.mjs";
import fruits from "./routes/fruit.mjs";
import express from "express";
import cors from "cors";

const PORT = 3000;
const app = express();

const options = {
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}

app.use(cors());
app.use(express.json());

// Access control headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

// Use the fruits router
app.use("/fruit", fruits);
app.use("/post", posts);

// Create HTTPS server
let server = https.createServer(options, app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
