const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");
const Contract = require("../models/contract.model");
const { autoIncrement } = require("../utils/auto-increment");
const { formatDateTime } = require("../utils/date-format");

const Backup = mongoose.model(
  "backup_contract",
  new mongoose.Schema({}, { strict: false })
);

exports.createContract = async (req, res) => {
  try {
    // autoinc
    const autoInc = await autoIncrement(Contract,'serial');
    const car_out = formatDateTime(req.body.car_out);
    const car_back = formatDateTime(req.body.car_back);
    console.log("hiii", car_out);

    console.log(autoInc)

    const contract = new Contract({
      ...req.body,
      serial: autoInc,
      car_out: car_out,
      car_back: car_back,
      status:'Contract is Open'
    });
    const result = await contract.save();

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.deleteContract = async (req, res) => {
  const { id } = req.params;

  Contract.findByIdAndDelete({ _id: id })
    .then((car) => {
      if (car) {
        return res.status(205).json({
          status: 400,
          message: "successfully deleted",
        });
      }
      return res
        .status(404)
        .json({ status: 404, message: "Contract not found" });
    })
    .catch((err) => {
      return res.status(500).json({ status: 500, message: err.message });
    });
};

async function storeBackup(backupContract) {
  try {
    // Create a new backup document
    const backup = new Backup({
      _id: new mongoose.Types.ObjectId(),
      data: backupContract,
      timestamp: new Date(),
    });

    // Save the backup document
    await backup.save();

    console.log("contract backup stored successfully");
  } catch (error) {
    console.error("Error contractBackup backup:", error);
  }
}
exports.updateContract = async (req, res) => {
  const contract = await Contract.findById(req.params.id);

  // create Backup :
  const contractBackup = { ...contract.toObject() };

  console.log("contract backup", contractBackup);

  await storeBackup(contractBackup);

  count = 0;




// await   Backup.find({})
//     .sort({ timestamp: -1 })
//     .then((result) => {
//       console.log("result", result);
      

      // result.map((item) => {
      //   if ((item.data.serial === contract.serial) && count >2) {
      //     console.log("yes");
      //     return res.status(200).json({
      //       status: 200,
      //       message: "you can't update this contract",
      //       attempts: true,
      //     });
      //   }



       Contract.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then((contract) => {
        if (contract) {
          
          console.log("contract",contract);
          console.log("req.body",req.body);
          console.log("car",req.body.car);
          console.log("car contract",contract.car);




          Car.findByIdAndUpdate(req.body.car, { $set:{rented: true }}).then(car => {
            console.log("current car to update",car);
          })
          
     
          return res.status(200).json({
            status: 200,
            data: contract,
            message: "Successfully updated Contract",
          });
     
        }
        else {
          return res
          .status(404)
          .json({ status: 404, message: "Contract not found" });
        }
     
      })
      .catch((error) => {
       console.log(error);
      }); 
     
  







    
 
};

exports.getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Contract.findById(id).populate("owner").populate("car");
    console.log("conract", car);

    if (!car) {
      return res
        .status(404)
        .json({ status: 404, message: "Contract not found" });
    }

    return res.status(200).json(car);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({}).populate("car").populate("owner");
    console.log(contracts);
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getAllContractsBackups = async (req, res) => {
  try {
    const contracts = await Backup.aggregate([
      {
        $group: {
          _id: "$data.serial",
          doc: { $first: "$$ROOT" },
          
        },
      },
      {
        $replaceRoot: { newRoot: "$doc" },
      },
      {
        $lookup:{
          from:'Car',
          localField:'data.car',
          foreignField:'_id',
          as:'car'
        }
      }
    ])

    console.log("car",contracts);
    return res.status(200).json(contracts);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};



exports.getAutoInc = async (req, res) => {
  try {
    const autoInc = await autoIncrement(Contract,'serial');





    return res.status(200).json(autoInc);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

