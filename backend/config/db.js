// const mongoose = require('mongoose')

// const connectDB = async () => {
//     try {
//         mongoose.set('strictQuery', false);
//         mongoose.connect(process.env.MONGO_URI); 
//         console.log('Database connected');
//     } catch(error) {
//         console.log(error);
//         process.exit();
//     }
// }



const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');

        // Your field name update code here
        // const collection = mongoose.connection.collection('tools');
        // await collection.updateMany({}, { $rename: { "toolImg": "toolImages" } });
        // await collection.updateMany({}, { $push: { "toolImages": "https://picsum.photos/1500/1000/?blur" } });
        // await collection.updateMany({}, { $unset: { "toolImages": 1 } });
        // await collection.updateMany({}, {
        //     $push: {
        //         "toolImages": {
        //             public_id: "/RentiVerse/items/image2",
        //             secure_url: "https://picsum.photos/1500/1000/?blur"
        //         }
        //     }
        // });
        // await collection.updateMany({}, { $pop: { "toolImages": 1 } });
        // console.log('Field name changed successfully.');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};



module.exports = connectDB;