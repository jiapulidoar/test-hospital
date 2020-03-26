import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

//initialize firebase inorder to access its services
admin.initializeApp(functions.config().firebase);

//initialize express server
const app = express();

//add the path to receive request and set json as bodyParser to process the body 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//initialize the database and the collection 
const db = admin.firestore();
const questionCollection = 'Question';
/*const labelCollecctions = 'Label';          
const optionCollections = 'Options'; 

/
interface Question {
    label: Label,
    options: Options
}

interface Label {
    type: String, 
    content: String 
}
interface Options {
    label: Label,
    return: String 
}
*/

// Create new user

app.get('/',function(req,res,next) {
    res.send('home or root functionality');
});

app.get('/questions', async (req, res) => {
   try {
        const questionQuerySnapshot = await db.collection(questionCollection).get();
        const questions: any[] = [];
        questionQuerySnapshot.forEach(
            (doc)=>{
                questions.push({
                    id: doc.id,
                    data: doc.data(),
                    //options: doc.options.data()
                    //data:doc.data()
            });
            }
        );
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send(error);
    }
});



//define google cloud function name
export const webApi = functions.https.onRequest(app);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
