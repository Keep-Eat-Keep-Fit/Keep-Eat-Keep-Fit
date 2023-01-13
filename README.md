![alt ironhack-logo](https://i.imgur.com/1QgrNNw.png)
# Our second Project--Keep-Eat-Keep-Fit

## Description

Nowadays people not only want to enjoy food but also wanna keep fit. So how to control the weight, and keeping the weight in a healthy range is very important. This app can help the users to check the calories of the food, calculate the intake in a day, and get to know their BMI-index during the BMI-calculator.  


## Instructions to run this app in my computer

After forking and cloning the project, you will have to install all the dependencies:

  -"[axios](https://www.npmjs.com/package/axios)": "^0.27.2",
  -"[bcryptjs](https://www.npmjs.com/package/bcryptjs)": "^2.4.3",
  -"[connect-mongo](https://www.npmjs.com/package/connect-mongo)": "^4.6.0",
  -"[cookie-parser](https://www.npmjs.com/package/cookie-parser)": "^1.4.6",
  -"[dayjs](https://www.npmjs.com/package/dayjs)": "^1.11.7",
  -"[dotenv](https://www.npmjs.com/package/dotenv)": "^16.0.3",
  -"[express](https://www.npmjs.com/package/express)": "^4.18.2",
  -"[express-session](https://www.npmjs.com/package/express-session)": "^1.17.3",
  -"[hbs](https://www.npmjs.com/package/hbs)": "^4.2.0",
  -"[mongoose](https://www.npmjs.com/package/mongoose)": "^6.8.2",
  -"[morgan](https://www.npmjs.com/package/morgan)": "^1.10.0",
  -"[serve-favicon](https://www.npmjs.com/package/serve-favicon)": "^2.5.0"
  -"[nodemon](https://www.npmjs.com/package/nodemon)": "^2.0.20"
  
`$ npm install`


## environment variables: 
-- getting the credentials of API

The [Edamam Food and Grocery Database](https://rapidapi.com/edamam/api/edamam-food-and-grocery-database) need a X-RapidAPI-Key and X-RapidAPI-Host in order to give us permission to make requests and get some data back. To get `X-RapidAPI-Key` and `X-RapidAPI-Host`, we have to register on the [RapidAPI](https://rapidapi.com) (you won't be charged for this, and no credit card information will be required). Then put them in your `.env` file :

`CLIENT_KEY = 'Your Key should be here'
 CLIENT_HOST = 'edamam-food-and-grocery-database.p.rapidapi.com'`

-- getting session info
You need to store the `SESS_SECRET = 'Your choice here'`here in `.env` file.


## how to run the application 
To run the app:

`$ npm run dev`

## Demo

Link to the deployed version of the project (adaptable): 
[Keep-Eat-Keep-Fit](https://keep-eat-keep-fit.adaptable.app/)

Enjoy!

:laughing:
:heart: