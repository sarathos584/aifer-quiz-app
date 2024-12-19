'use client'

import useQuestions from "@/hooks/useQuestions";
import { ReactNode, createContext, useCallback, useContext, useState } from "react";


const QuestionsContext = createContext<any | undefined>(undefined);

export const QuestionsProvider = ({ children }: { children: ReactNode })=> {

    const { questions, isError, isLoading } = useQuestions('list')

    const [activeQuestion, setActiveQuestion] = useState(0) 

    const activeQuestionToggle = useCallback((idx: number) => {
            setActiveQuestion(idx)
            questions.status = 'active'
    }, [questions])

    const completeQuestionStatus = useCallback((idx: number) => {
            setActiveQuestion(idx)
            questions.status = 'completed'
    }, [questions])

    const contextValues = { questions, 
                            isError, 
                            isLoading, 
                            activeQuestion, 
                            completeQuestionStatus,
                            activeQuestionToggle  }
    
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