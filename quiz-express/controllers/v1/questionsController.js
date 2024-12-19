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
       
        const questions = await Question.find({ }).select('question options')

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

export const getAnswerAndExplanation = async (req, res, next) => {

    try {
      const errors = validationResult(req);
      if (! errors.isEmpty()) {
        console.error(errors)
        
        return next(new HttpError("Invalid data inputs passed, Please check your data before retry!",422));
      } else {

        const { id } =  req.body
       
        const data = await Question.findById(id).select('answer explanation')

        if (! data) {

            return next(new HttpError("Process failed for fetching data!", 400))
        } else {

            res.status(200).json({
                status : true,
                message : null,
                access_token : null,
                data : data
            })
        }
      }
    } catch (err) {
      console.error(err)

      return next(new HttpError("Oops! Process failed!", 500));
    }
};