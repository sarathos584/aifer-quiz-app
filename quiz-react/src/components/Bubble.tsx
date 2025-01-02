'use client'

import { useQuestionContext } from "@/contexts/QuestionsProvider"
import { memo, useCallback, useEffect } from "react"

const statusStyleObj: { [key: string]: string } = {
    active: 'bg-indigo-400 text-white',
    attended: 'bg-indigo-300 text-white',
}

interface Props {
  value: number, 
  status: string
  id: string
}

const Bubble = ({ value, status, id }: Props) => {

  const getAdditionalStyles = () => {

    return statusStyleObj[status] ? statusStyleObj[status] : 'bg-slate-300 text-black' 
  }

  const { questionStatusToggle, selectedAnswer, activeQuestion, questions } = useQuestionContext()


  useEffect(()=> {
    if (questions[activeQuestion]?.selectedAnswer && value === activeQuestion) {
      questionStatusToggle(value, 'attended')
    }
  }, [activeQuestion, questionStatusToggle, questions, selectedAnswer, value])

  const selectQuestionOnClick = useCallback(()=> {

      questionStatusToggle(value, '')
  }, [questionStatusToggle, value])

  return (
    <div 
    onClick={selectQuestionOnClick}
    className={`w-[2.5em] h-[2.5em] cursor-pointer rounded-full p-2  grid place-content-center ${getAdditionalStyles()}`}>
        <span>{value + 1}</span>
    </div>
  )
}
const MemoizedBubble = memo(Bubble)
MemoizedBubble.displayName = 'Bubble'

export default MemoizedBubble