require("../config/mongoose-setup");

// import the product model to do product queries
const AvailabilityModel = require("../models/availability-model");


const availabilityInfo = [
  {
    date: 11/02/2017,
    description: "WORK"
  },
  {
    date: 11/05/2017,
    description: "WORK"
  },
  {
    date: 11/08/2017,
    description: "WORK"
  },
  {
    date: 11/01/2017,
    description: "WORK"
  },
  {
    date: 11/14/2017,
    description: "WORK"
  },
  {
    date: 11/17/2017,
    description: "WORK"
  },
  {
    date: 11/20/2017,
    description: "WORK"
  },
  {
    date: 11/23/2017,
    description: "WORK"
  },
  {
    date: 11/26/2017,
    description: "WORK"
  },
  {
    date: 11/29/2017,
    description: "WORK"
  },
  {
    date: 12/02/2017,
    description: "WORK"
  },
  {
    date: 12/05/2017,
    description: "WORK"
  },
  {
    date: 12/08/2017,
    description: "WORK"
  },
  {
    date: 12/01/2017,
    description: "WORK"
  },
  {
    date: 12/14/2017,
    description: "WORK"
  },
  {
    date: 12/17/2017,
    description: "WORK"
  },
  {
    date: 12/20/2017,
    description: "WORK"
  },
  {
    date: 12/23/2017,
    description: "WORK"
  },
  {
    date: 12/26/2017,
    description: "WORK"
  },
  {
    date: 12/29/2017,
    description: "WORK"
  }
];

AvailabilityModel.create(availabilityInfo)
  .then( (availabilityResults) => {
      console.log(`Inserted ${availabilityResults.length} work days`);
  })
  .catch((err) => {
    console.log("Availability insert error!");
    console.log(err);
  });
