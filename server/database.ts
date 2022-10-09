import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI!, {
    dbName: 'DevCenter'
})
    .then((database) => {
        console.log('Database is connected.');
    })
    .catch((err) => {
        console.log(err);
    });