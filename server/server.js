import { v2 } from 'cloudinary';
import app from './app.js';
import connectionToDb from './config/dbConnection.js';

const port = process.env.PORT || 5000;

// cloudinary configuration
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(port , async () => {
    await connectionToDb();
    console.log(`App is running at http://localhost:${port}`);
});
