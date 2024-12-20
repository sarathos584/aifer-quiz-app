
'use client'

import dynamic from "next/dynamic"
import Link from "next/link"
import Card from "@/components/Card"

import { useCallback, useState } from "react"
import { Question } from "@/types/types"
import { useQuestionContext } from "@/contexts/QuestionsProvider"
import BubbleSkelton from "@/components/skeltons/BubbleSkelton"
import QuestionCardSkelton from "@/components/skeltons/QuestionCardSkelton"
import SelectAnswerDialog from "@/components/SelectAnswerDialog"

const QuestionCard = dynamic(()=> import("@/components/QuestionCard"), { ssr: false, loading: ()=> <QuestionCardSkelton/> })
const ExplanationCard = dynamic(()=> import("@/components/ExplanationCard"), { ssr: false })
const Bubble = dynamic(()=> import("@/components/Bubble"), { ssr: false ,loading:()=> <BubbleSkelton/> })


const QuizPage = () => {

const [warning, setWarning] = useState(false)

const toggleWarningDialog = useCallback(()=> {
    setWarning(prev=> ! prev)
}, [])

const { questions, 
        isLoading, 
        isError, 
        activeQuestion, 
        questionStatusToggle, 
        setSelectedAnswer
     } = useQuestionContext()


const prevQuestion = useCallback(() => {
    questionStatusToggle(activeQuestion, 'attended')
    questionStatusToggle(activeQuestion - 1, 'active')
    setSelectedAnswer(null)
}, [activeQuestion,setSelectedAnswer, questionStatusToggle])

const nextQuestion = useCallback(() => {
   if (questions[activeQuestion]?.selectedAnswer) {
    questionStatusToggle(activeQuestion, 'attended')
    questionStatusToggle(activeQuestion + 1, 'active')
    setSelectedAnswer(null)
   } else {
    toggleWarningDialog()
   }
}, [questions, activeQuestion, questionStatusToggle, setSelectedAnswer, toggleWarningDialog])

const renderQuestionBubbles = useCallback((questions: Question[]) => {

   return questions.map((question: Question, idx: number)=> (<Bubble 
                                                        value={idx} 
                                                        status={idx === activeQuestion ? 'active' : question?.status ?? ''} 
                                                        id={question._id} 
                                                        key={idx}/>))
}, [activeQuestion])

 if (isLoading) {
    
    return  (
        <main className="py-4">
            <section id='quiz' className="h-full bg-slate-100 min-h-[75vh] w-full] mx-auto mobile:max-w-[90vw] max-w-[75vw]  rounded-md px-4 py-3">
                <h3 className="text-center font-medium text-xl text-black mb-[1em]">Quiz Title</h3>
                <div className="mobile:grid  flex gap-5"/>
            </section>
         </main>
           
    )
 }

 if (isError) {
    
    return <div>Error</div>
 }

 if (questions) {
    
    return (
       <main className="py-4">
         <section id='quiz' className="h-full bg-slate-100 min-h-[75vh] w-full] mx-auto mobile:max-w-[90vw] max-w-[75vw]  rounded-md px-4 py-3">
            <h3 className="text-center font-medium text-xl text-black mb-[1em]">Quiz Title</h3>
            <div className="mobile:grid  flex gap-5">
            <div className="basis-[70%] mobile:min-h-[53vh] min-7-[70vh]">
                <QuestionCard />
                <div className="button-group flex justify-center items-center gap-x-2 mt-5">
                    <button disabled={activeQuestion === 0} onClick={prevQuestion} className="btn-primary">Prev</button>
                    <button disabled={activeQuestion === questions.length - 1} onClick={nextQuestion} className="btn-primary">Next</button>
                </div>
                <ExplanationCard/>
            </div>
            <div className="basis-[30%] bg-purple-100 mobile:min-h-[30vh] min-h-[70vh]">
            <Card className="min-h-full">
                <div className="card-header flex justify-between items-center text-slate-950 mb-6">
                <p>Question {activeQuestion + 1}/{questions.length}</p>
                <Link href={'/'}>Need Help?</Link>
                </div>
                <div className="card-content grid grid-cols-5 desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-5 gap-2 place-items-center">
                {
                   renderQuestionBubbles(questions)
                }
                </div>
            </Card>
        </div>
            </div>
          </section>
          <SelectAnswerDialog isOpen={warning} onClose={toggleWarningDialog}/>
       </main>
      )
 }
}

export default QuizPage