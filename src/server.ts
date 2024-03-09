import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import movieRoutes from './routes/movieRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/movies', movieRoutes);

mongoose.connect('mongodb://localhost:27017', {
    dbName: 'movieLobby',
    user: 'root',
    pass: 'root'
})
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error(error));

export default app