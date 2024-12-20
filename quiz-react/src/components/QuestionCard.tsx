
import { useCallback, useEffect, useMemo } from 'react'
import Card from './Card'
import { Question } from '@/types/types'
import { useQuestionContext } from '@/contexts/QuestionsProvider'


const QuestionCard = () => {

  const { activeQuestion,selectedAnswer, setSelectedAnswer, questions } = useQuestionContext()
  const { question, options } = questions[activeQuestion]

  const getAdditionalStyles = useCallback((option: string)=> {
    let styles = 'hover:bg-indigo-100'
    
    if (option === selectedAnswer) {
        styles = 'selected_answer'

      if (option === questions[activeQuestion]?.answer) {
        styles = 'correct_answer'
      } else if (questions[activeQuestion]?.answer && (option !== questions[activeQuestion]?.answer)) {
        styles = 'incorrect_answer'
      }
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