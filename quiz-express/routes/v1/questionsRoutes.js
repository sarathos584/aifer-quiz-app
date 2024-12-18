import { Router } from "express";
import { listQuestions } from "../../controllers/v1/questionsController.js";

const questionRouter = Router()

questionRouter.get('/list', listQuestions)

export default questionRouter