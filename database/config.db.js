const mongoose = require("mongoose");
const mongoConection = process.env.MongoDB_Atrlas;

const dbConection = async () => {

    try {

         mongoose.set("strictQuery", true);
        await mongoose.connect(mongoConection)

        console.log("Base de datos online ")

    } catch (error) {

        console.log(error);
        throw new Error("Error a  la hora de  iniciar la base de datos ");

    }

}



module.exports = {
    dbConection


}