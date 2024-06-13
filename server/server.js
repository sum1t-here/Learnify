import app from './app.js';
import connectionToDb from './config/dbConnection.js';

const port = process.env.PORT || 5000;

app.listen(port , async () => {
    await connectionToDb();
    console.log(`App is running at http://localhost:${port}`);
});
