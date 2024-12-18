import { validationResult } from "express-validator";
import HttpError from "../../utils/httpError.js";
import Question from "../../models/question.js";

export const listQuestions = async (req, res, next) => {

    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {
        console.error(errors)
        
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
      } else {
       
        const questions = await Question.find({ })

        if (! questions) {

            return next(new HttpError("Process failed for fetching questions!", 400))
        } else {

            res.status(200).json({
                status : true,
                message : null,
                access_token : null,
                data : questions
            })
        }
      }
    } catch (err) {
      console.error(err)

      return next(new HttpError("Oops! Process failed!", 500));
    }
};