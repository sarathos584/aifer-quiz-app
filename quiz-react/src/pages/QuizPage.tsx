
'use client'

import dynamic from "next/dynamic"
import Link from "next/link"
import Card from "@/components/Card"
import axios from 'axios'

import Loading from "@/app/(front-end)/loading"
import { useCallback, useEffect, useState } from "react"
import useQuestions from "@/hooks/useQuestions"
import { Question } from "@/types/types"
import { useQuestionContext } from "@/contexts/QuestionsProvider"

const QuestionCard = dynamic(()=> import("@/components/QuestionCard"), { ssr: false, loading: () => <Loading/> })
const ExplanationCard = dynamic(()=> import("@/components/ExplanationCard"), { ssr: false, loading: () => <Loading/> })
const Bubble = dynamic(()=> import("@/components/Bubble"), { ssr: false, loading: () => <Loading/> })




const QuizPage = () => {

const { questions, isLoading, isError } = useQuestionContext()

const renderQuestionBubbles = useCallback((questions: Question[]) => {

   return questions.map((question: Question, idx: number)=> (<Bubble 
                                                        value={idx} 
                                                        status={'todo'} 
                                                        id={question._id} 
                                                        key={idx}/>))
}, [])



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
                <QuestionCard question={'loere asdj fa asdjf asl asdjj'} questionCount={1} options={['11', '111', '1111']}/>
                <div className="button-group flex justify-center items-center gap-x-2 mt-5">
                    <button className="btn-primary">Prev</button>
                    <button className="btn-primary">Next</button>
                </div>
                <ExplanationCard explanation={'This is sample explanation'}/>
            </div>
            <div className="basis-[30%] bg-purple-100 min-h-[70vh]">
            <Card className="min-h-full">
                <div className="card-header flex justify-between items-center text-slate-950 mb-6">
                <p>Question 1/8</p>
                <Link href={'/'}>Need Help?</Link>
                </div>
                <div className="card-content grid grid-cols-5 gap-2 place-items-center">
                {/* <Bubble value={1} status="active"/>
                <Bubble value={1} status="todo"/>
                <Bubble value={1} status="completed"/> */}
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