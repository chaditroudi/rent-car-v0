
const autoIncrement=async(model,serial) => {
    
    const highestSerial = await model.findOne({},{[serial]:1,_id:0}).sort({[serial]:-1}).exec();

    console.log("High",highestSerial)
    const autoInc= highestSerial ?  highestSerial[serial]  + 1 : 1;

    return autoInc;
}

module.exports = {
    autoIncrement
}