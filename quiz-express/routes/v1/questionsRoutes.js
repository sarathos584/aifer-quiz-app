import { Router } from "express";
import { getAnswerAndExplanation, listQuestions } from "../../controllers/v1/questionsController.js";

const questionRouter = Router()

questionRouter.get('/list', listQuestions)

questionRouter.post('/explanation', getAnswerAndExplanation)

export default questionRouter