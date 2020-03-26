import * as express from "express";
import admin from "../../fb"; 

//firebase 
const db = admin.firestore();
const questionCollection = 'Question';

// router
export let questionRouter = express.Router();

questionRouter.get('/test',function(req,res,next) {
    res.send('home  questions or root functionality');
});

// Get all questiones 

questionRouter.get('/', async (req, res) => {
   try {
        const questionQuerySnapshot = await db.collection(questionCollection).get();
        const questions: any[] = [];
        questionQuerySnapshot.forEach(
            (doc)=>{
                questions.push({
                    id: doc.id,
                    data: doc.data(),
            });
            }
        );
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send(error);
    }
});