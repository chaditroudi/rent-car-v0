const { default: mongoose } = require("mongoose");
const Report = require("../models/report.model");
const Car = require('../models/car.model');

exports.createReport = async (req, res) => {
  try {




    car = req.body.car;
    contract = req.body.contract;
    const newReport = new Report({
        car:car,
        contract:contract
    })




    const result = await newReport.save();

    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  
    const { id } = req.params;

    Report.findByIdAndDelete({ _id: id }).then((Report) => {
      if(Report) {
        return res.status(205).json({
          status: 400,
          message: "successfully deleted",
        });
      }
      return res.status(404).json({ status: 404, message: 'Report not found' });



    }).catch((err) => {
      return res.status(500).json({ status: 500, message: err.message });
    });
};

exports.getReportById = async (req, res) => {
    try {
      const { id } = req.params;
      const Report = await Report.findById(id);
  
      if (!Report) {
        return res.status(404).json({ status: 404, message: 'Report not found' });
      }
  
      return res.status(200).json(Report);
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };

exports.updateReport = async (req, res) => {
  await Report.findByIdAndUpdate(req.params.id, {$set: req.body})
  .then((Report) => {
    if(Report) {
      return res.status(200).json({
        status: 200,
        data: Report,
        message: "Successfully updated Report",
      })
    } 
    return res.status(404).json({ status: 404, message: 'Report not found' });


  }).catch((error) => {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  });
};



exports.getAllReports = async (req, res) => {
  rentedCars =[];
availableCars = [];
  try {
    const reports= await Report.find({}).populate('car').populate('contract');
    const cars = await Car.find({});


    reports.map((item)=> {

      if(item.car.rented) {
        rentedCars.push(item.car);
      }});

      cars.map((item)=> {
        if(!item.rented) {
          availableCars.push(item);

        }
      })




  



    


    return res.status(200).json({
      rentedCars:rentedCars,
      availableCars:availableCars,
  
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}





exports.fetchMonthlyRep = async (req, res) => {
  monthlyRep =[];
  try {
    const reports= await Report.find({}).populate('car').populate('contract');


    reports.map((item)=> {

        monthlyRep.push(item);

        console.log("*Monthly",monthlyRep)

   
    });


      
  



    


    return res.status(200).json({
      monthlyRep,
 
  
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
}


