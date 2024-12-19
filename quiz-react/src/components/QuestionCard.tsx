
import { useCallback, useEffect, useMemo } from 'react'
import Card from './Card'
import { Question } from '@/types/types'
import { useQuestionContext } from '@/contexts/QuestionsProvider'

interface Props {
    questionData: Question
}

const QuestionCard = ({ questionData }: Props) => {

  const { activeQuestion,selectedAnswer, setSelectedAnswer, questions } = useQuestionContext()
  const { question = '', options = [] } = questionData

  const getAdditionalStyles = useCallback((option: string)=> {
    let styles = 'hover:bg-indigo-100'
    
    if (option === selectedAnswer) {
      styles = 'bg-indigo-500'

      if (questions[activeQuestion]?.answer && (option !== questions[activeQuestion]?.answer)) {
        styles = 'bg-red-500'
       }
    }
  
     if (option === questions[activeQuestion]?.answer) {
      styles = 'bg-green-500'
    }
  
    return styles
  }, [activeQuestion, questions, selectedAnswer])

  const handleSelectOption = useCallback((option: string) => {
    if (!(questions[activeQuestion]?.answer)) {
      setSelectedAnswer(option)
    }
  }, [activeQuestion, questions, setSelectedAnswer])

    const renderOptions = useCallback((options: string[]) => {
      
        return (
          options.map((option: string, idx: number)=> (
            <div key={idx} className='mb-3 bg-transparent' onClick={()=> handleSelectOption(option)}>
                <Card 
                className={`${getAdditionalStyles(option)} shadow-none cursor-pointer`}>
                <p className='text-slate-900'>{option}</p>
                </Card>
            </div>
          ) )
        )
      }, [getAdditionalStyles, handleSelectOption])

  return (
    <>
    <Card className='border-indigo-500/100'>
      <p className="font-medium text-black mb-2">Question {activeQuestion + 1}</p>
      <div>
       <p className="text-zinc-600">{question}</p>
      </div>
    </Card>

    <div className="options mt-4">
    { renderOptions(options) }
    </div>
    </>
  )
}

export default QuestionCard