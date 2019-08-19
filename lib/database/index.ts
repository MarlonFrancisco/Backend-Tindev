import * as mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/tindev", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const connection = mongoose.connection;

connection.on("error", (err) => console.log(err));

export default mongoose;
