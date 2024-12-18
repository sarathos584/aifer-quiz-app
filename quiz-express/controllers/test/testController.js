import { validationResult } from "express-validator";
import HttpError from "../../utils/httpError.js";
import Question from "../../models/question.js";

export const addQuestion = async (req, res, next) => {

    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {
        console.error(errors)
        
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
      } else {
         const {
            question,
            options,
            answer,
            explanation
        } = req.body


        const newQuestion = await new Question({
            question,
            options,
            answer,
            explanation
        }).save()

        if (! newQuestion) {

            return next(new HttpError("Process failed for adding question!", 400))
        } else {

            res.status(200).json({
                status : true,
                message : "Question added successfully",
                access_token : null,
                data : null
            })
        }
      }
    } catch (err) {
      console.error(err)

      return next(new HttpError("Oops! Process failed!", 500));
    }
};