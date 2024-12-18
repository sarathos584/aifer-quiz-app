
import { useCallback } from 'react'
import Card from './Card'

interface Props {
    questionCount: number,
    question: string,
    options: string[]
}

const QuestionCard = ({ questionCount, question, options }: Props) => {

    const renderOptions = useCallback((options: string[]) => {

        return (
          options.map((option: string, idx: number)=> (
            <div key={idx} className='mb-3 bg-transparent'>
                <Card className='hover:bg-indigo-100 shadow-none cursor-pointer'>
                <p className='text-slate-900'>{option}</p>
                </Card>
            </div>
          ) )
        )
      }, [])

  return (
    <>
    <Card className='border-indigo-500/100'>
      <p className="font-medium text-black mb-2">Question {questionCount}</p>
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