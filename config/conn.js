const { default: mongoose } = require("mongoose")

function connectionestablished (){

    let URI= process.env.MONGO_URI


    try {
        mongoose.set('strictQuery',false)
        mongoose.connect(URI);
        console.log('connection established');
    } catch (error) {
        console.log(error);
    }
}

module.exports=connectionestablished