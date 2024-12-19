
'use client'

import { memo, useCallback, useEffect, useState } from "react"
import Card from "./Card"
import axios from "axios"
import { useQuestionContext } from "@/contexts/QuestionsProvider"

const ExplanationCard = () => {

  const [explanation, setExplanation] = useState<null | any>(null)
  const [showExplanation, setShowExplanation] = useState<boolean>(false)
  const { activeQuestionObjectId, activeQuestion, selectedAnswer, setQuestionAnswer, questions } = useQuestionContext() 
  
  const checkAnswerAndGetExplanation = useCallback( async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/questions/explanation`, 
    { id: activeQuestionObjectId, answer: selectedAnswer }).then(res=> {
      setExplanation(res.data.data)
      setQuestionAnswer(activeQuestion, res.data.data.answer)
      setShowExplanation(true)
    }).catch(err=> {
      console.error(err, 'error')
    })
  }, [activeQuestion, activeQuestionObjectId, selectedAnswer, setQuestionAnswer])

  const toggleExplanation = useCallback(()=> {
    checkAnswerAndGetExplanation()
  }, [checkAnswerAndGetExplanation])

  useEffect(()=> {
    if (!(questions[activeQuestion]?.answer))
    setShowExplanation(false)
  }, [activeQuestion, questions])


  return (
    <>
        <span  
        className="underline underline-offset-4 font-normal text-indigo-400 cursor-pointer" 
        onClick={toggleExplanation}
        >
        Show Explanation
        </span>

        { showExplanation && explanation && (
            <Card className="mt-3">
                <p className="card-title">Explanation</p>
                <div>
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