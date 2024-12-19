
'use client'

import { memo, useCallback, useState } from "react"
import Card from "./Card"
import axios from "axios"
import { useQuestionContext } from "@/contexts/QuestionsProvider"

const ExplanationCard = () => {
  const [explanation, setExplanation] = useState('')
  const [showExplanation, setShowExplanation] = useState<boolean>(false)

  const { activeQuestionObjectId } = useQuestionContext() 
  
  const checkAnswerAndGetExplanation = useCallback( async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/questions/explanation`, { activeQuestionObjectId }).then(res=> {
      setExplanation(res.data.data)
      setShowExplanation(true)
    }).catch(err=> {
      console.error(err, 'errr')
    })
  }, [activeQuestionObjectId])

  const toggleExplanation = useCallback(()=> {
    checkAnswerAndGetExplanation()
  }, [checkAnswerAndGetExplanation])


  return (
    <>
        <span  
        className="underline underline-offset-4 font-normal text-indigo-400 cursor-pointer" 
        onClick={toggleExplanation}
        >
        Show Explanation
        </span>

        { showExplanation && (
            <Card className="mt-3">
                <p className="card-title">Explanation</p>
                <div>
                    <p className="text-slate-900">{explanation}</p>
                </div>
            </Card>
            )}
    </>
  )
}
const MemoizedExplanation = memo(ExplanationCard)

MemoizedExplanation.displayName = 'ExplanationCard'

export default MemoizedExplanation