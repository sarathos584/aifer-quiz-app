
'use client'

import { memo, useCallback, useEffect, useState } from "react"
import Card from "./Card"
import axios from "axios"
import { useQuestionContext } from "@/contexts/QuestionsProvider"

const ExplanationCard = () => {

  const [explanation, setExplanation] = useState<null | any>(null)
  const [showExplanation, setShowExplanation] = useState<boolean>(false)
  const { activeQuestionObjectId, activeQuestion, selectedAnswer, setQuestionAnswer, questions } = useQuestionContext() 
  const [isButtonLoading, setIsButtonLoading] = useState(false)
  
  const checkAnswerAndGetExplanation = useCallback( async () => {
    setIsButtonLoading(true)
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/questions/explanation`, 
    { id: activeQuestionObjectId, answer: selectedAnswer }).then(res=> {
      setExplanation(res.data.data)
      setQuestionAnswer(activeQuestion, res.data.data.answer)
      setIsButtonLoading(false)
      setShowExplanation(true)
    }).catch(err=> {
      setIsButtonLoading(false)
    })
  }, [activeQuestion, activeQuestionObjectId, selectedAnswer, setQuestionAnswer])

  const toggleExplanation = useCallback(()=> {
    if (! isButtonLoading && !showExplanation) checkAnswerAndGetExplanation()
  }, [checkAnswerAndGetExplanation, isButtonLoading, showExplanation])

  useEffect(()=> {
    if (!(questions[activeQuestion]?.answer))
    setShowExplanation(false)
  }, [activeQuestion, questions])


  return (
    <>
        <p  
        className="mobile:text-center mobile:mt-3 tablet:text-center tablet:mt-3 underline underline-offset-4 font-normal text-indigo-400 cursor-pointer xs:text-center xs:mt-2" 
        
        >
        <span className="cursor-pointer" onClick={toggleExplanation}>Show Explanation</span>
        </p>
        {
          isButtonLoading && <div className="mt-3 py-11 bg-slate-300 rounded-md"/>
        }

        { showExplanation && explanation && (
            <Card className="mt-3">
                <p className="card-title">Explanation</p>
                <div>
                    <p className="text-slate-900">Correct Answer: {explanation?.answer}</p>
                    <p className="text-slate-900">{explanation.explanation}</p>
                </div>
            </Card>
            )}
    </>
  )
}
const MemoizedExplanation = memo(ExplanationCard)

MemoizedExplanation.displayName = 'ExplanationCard'

export default MemoizedExplanation