This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Running the app](#running-the-app)
- [Notes](#notes)

## Running the app

After downloading the app, please run `npm install` to download all of the npm dependencies.

To start the server, run `npm run start`. The app will run on http://localhost:3000 by default

## Notes

 - To get the logged in user data, I am parsing the website cookie and looking for the username. As this project does not run on the instructables website, Ive included a sample cookie inside App.js. In production, the sample cookie can be replaced with the real cookie by using `document.cookie`

 - The `GET` requests using the user API is currently going through a proxy to overcome the cors issue. In dev, we can remove the proxy when the origin is the same as instructables.com. 

 - The `POST` request to follow other users is currently set up but will not work due to CORS issues. However, if the request were to go through, it will make a new Get request to the server to get the new data for both the author and the user itself and update the app accordingly eg. Button will change from follow -> following and count will increase

