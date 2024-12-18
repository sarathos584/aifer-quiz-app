import { Router } from "express";
import { addQuestion } from "../../controllers/test/testController.js";
import { check } from "express-validator";

const testRouter = Router()

testRouter.post('/question/add',
 [
    check('question').not().isEmpty(),
    check('options').not().isEmpty(),
    check('answer').not().isEmpty(),
    check('explanation').not().isEmpty()
], addQuestion)

export default testRouter