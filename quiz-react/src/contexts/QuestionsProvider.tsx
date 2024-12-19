'use client'

import useQuestions from "@/hooks/useQuestions";
import { Question } from "@/types/types";
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";


const QuestionsContext = createContext<any | undefined>(undefined);

export const QuestionsProvider = ({ children }: { children: ReactNode })=> {

    const { questions: serverResponse, isError, isLoading } = useQuestions('list')

    const [activeQuestion, setActiveQuestion] = useState(0) 
    const [activeQuestionObjectId, setActiveQuestionObjectId] = useState<string | null>(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [questions, setQuestions] = useState<Question[]>([])

    useEffect(()=> {
      setQuestions(serverResponse)
    }, [serverResponse])

    useEffect(()=> {
      if (questions && questions.length > 0) {
        setActiveQuestionObjectId(questions[activeQuestion > 0 ? activeQuestion : 0]._id)
      }
    }, [questions, activeQuestion])


    const questionStatusToggle = useCallback((idx: number, status: string) => {
            setActiveQuestion(idx)
            const questionArr = questions
            questionArr[idx].status = status
            setQuestions(questionArr)
    }, [questions])

    const setQuestionAnswer = useCallback((idx: number, answer: string) => {
      const updatedQuestions = [...questions]; 
      updatedQuestions[idx] = { ...updatedQuestions[idx], answer }; 
      setQuestions(updatedQuestions); 
    }, [questions]);

    const contextValues = { questions, 
                            isError, 
                            isLoading, 
                            activeQuestion, 
                            questionStatusToggle,
                            activeQuestionObjectId,
                            setSelectedAnswer,
                            selectedAnswer,
                            setQuestionAnswer
                          }
    
    return (
        <QuestionsContext.Provider value={contextValues}>
         {children}
        </QuestionsContext.Provider>
    )
}

export const useQuestionContext = () => {
    const context = useContext(QuestionsContext);
  
    if (! context) {
      throw new Error('question provider must be wrapped inside a provider');
    }
  
    return context;
  };