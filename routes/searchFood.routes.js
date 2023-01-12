 express = require('express');
const router = express.Router();
const axios = require('axios');
const baseURL = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser'

router.get("/searchFood", (req, res, next) => {
    let foodName = req.query.foodName;
    
    const options = {
        method: 'GET',
        url: baseURL,
        params: {ingr: foodName}, 
        headers: {
          'X-RapidAPI-Key': process.env.CLIENT_KEY,
          'X-RapidAPI-Host': process.env.CLIENT_HOST
        }
      };

      axios.request(options)
        .then((response) => {
          let results = response.data.hints;          
          res.render("search/searchFood-result", {foodArr: results});
        })
      .catch(function (error) {
          console.error(error);
    });
})

// router.get("/searchFood-toDB", (req, res, next) => {
//   let foodName = req.query.foodName;
  
//   const options = {
//       method: 'GET',
//       url: baseURL,
//       params: {ingr: foodName}, 
//       headers: {
//         'X-RapidAPI-Key': process.env.CLIENT_KEY,
//         'X-RapidAPI-Host': process.env.CLIENT_HOST
//       }
//     };

//     axios.request(options)
//       .then((response) => {
//         let results = response.data.hints;
//         console.log(results);
//         res.render("search/searchFood-result", {foodArr: results});
//       })
//     .catch(function (error) {
//         console.error(error);
//   });
// })




module.exports = router;
