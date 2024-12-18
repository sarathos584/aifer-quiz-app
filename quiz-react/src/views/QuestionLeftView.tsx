'use client'

import dynamic from "next/dynamic"

const QuestionCard = dynamic(()=> import("@/components/QuestionCard"), { ssr: false })
const ExplanationCard = dynamic(()=> import("@/components/ExplanationCard"), { ssr: false })

const QuestionLeftView = () => {

  return (
    <div className="basis-[70%] min-h-[70vh]">
        <QuestionCard question={'loere asdj fa asdjf asl asdjj'} questionCount={1} options={['11', '111', '1111']}/>
        <div className="button-group flex justify-center items-center gap-x-2 mt-5">
            <button className="btn-primary">Prev</button>
            <button className="btn-primary">Next</button>
        </div>
        <ExplanationCard explanation={'This is sample explanation'}/>
    </div>
  )
}

export default QuestionLeftView