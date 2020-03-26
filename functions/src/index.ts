import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as questionApi from "./api/question";


//initialize express server
const app = express();

//add the path to receive request and set json as bodyParser to process the body 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/questions", questionApi.questionRouter);


//define google cloud function name
export const webApi = functions.https.onRequest(app);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
