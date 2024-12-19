
'use client'

import dynamic from "next/dynamic"
import Link from "next/link"
import Card from "@/components/Card"

import Loading from "@/app/(front-end)/loading"
import { useCallback } from "react"
import { Question } from "@/types/types"
import { useQuestionContext } from "@/contexts/QuestionsProvider"

const QuestionCard = dynamic(()=> import("@/components/QuestionCard"), { ssr: false, loading: () => <Loading/> })
const ExplanationCard = dynamic(()=> import("@/components/ExplanationCard"), { ssr: false, loading: () => <Loading/> })
const Bubble = dynamic(()=> import("@/components/Bubble"), { ssr: false, loading: () => <Loading/> })


const QuizPage = () => {

const { questions, 
        isLoading, 
        isError, 
        activeQuestion, 
        activeQuestionToggle } = useQuestionContext()


const prevQuestion = useCallback(() => {
    activeQuestionToggle(activeQuestion - 1)
}, [activeQuestion, activeQuestionToggle])

const nextQuestion = useCallback(() => {
    activeQuestionToggle(activeQuestion + 1)
}, [activeQuestion, activeQuestionToggle])

const renderQuestionBubbles = useCallback((questions: Question[]) => {

   return questions.map((question: Question, idx: number)=> (<Bubble 
                                                        value={idx} 
                                                        status={idx === activeQuestion ? 'active' : question?.status ?? ''} 
                                                        id={question._id} 
                                                        key={idx}/>))
}, [activeQuestion])

 if (isLoading) {
    
    return <div>Loading...</div>
 }

 if (isError) {
    
    return <div>Error</div>
 }

 if (questions) {
    
    return (
        <section id='quiz' className="h-full bg-slate-100 min-h-[75vh] w-full] mx-auto max-w-[75vw] rounded-md px-4 py-3">
            <h3 className="text-center font-medium text-xl text-black mb-[1em]">Quiz Title</h3>
            <div className="flex gap-5">
            <div className="basis-[70%] min-h-[70vh]">
                <QuestionCard questionData={questions[activeQuestion]} />
                <div className="button-group flex justify-center items-center gap-x-2 mt-5">
                    <button disabled={activeQuestion === 0} onClick={prevQuestion} className="btn-primary">Prev</button>
                    <button disabled={activeQuestion === questions.length - 1} onClick={nextQuestion} className="btn-primary">Next</button>
                </div>
                <ExplanationCard explanation={'This is sample explanation'}/>
            </div>
            <div className="basis-[30%] bg-purple-100 min-h-[70vh]">
            <Card className="min-h-full">
                <div className="card-header flex justify-between items-center text-slate-950 mb-6">
                <p>Question {activeQuestion + 1}/{questions.length}</p>
                <Link href={'/'}>Need Help?</Link>
                </div>
                <div className="card-content grid grid-cols-5 gap-2 place-items-center">
                {
                   renderQuestionBubbles(questions)
                }
                </div>
            </Card>
        </div>
            </div>
          </section>
      )
 }
}

export default QuizPage