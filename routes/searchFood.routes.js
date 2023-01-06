
const express = require('express');
const router = express.Router();
const axios = require('axios')
const baseURL = 'https://edamam-food-and-grocery-database.p.rapidapi.com/parser'

router.get("/searchFood", (req, res, next) => {
    let foodName = req.query.foodName;
    console.log(`Food name is ...${foodName}`);
    
    const options = {
        method: 'GET',
        url: baseURL,
        params: {ingr: foodName}, 
        headers: {
          'X-RapidAPI-Key': '355642015fmsh33e4fe49576ea55p16107ejsncf5aaac473a7',
          'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
        }
      };

      axios.request(options)
      .then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
          console.error(error);
    });
    
})




module.exports = router;
