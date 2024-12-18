'use client'

import { memo, useCallback, useState } from "react"
import Card from "./Card"

const ExplanationCard = ({ explanation }: { explanation: string }) => {

  const [showExplanation, setShowExplanation] = useState<boolean>(false)

  const toggleExplanation = useCallback(()=> {
    if (! showExplanation) setShowExplanation(true)
  }, [showExplanation])


  return (
    <>
        <span  
        className="underline underline-offset-4 font-normal text-indigo-400 cursor-pointer" 
        onClick={toggleExplanation}
        >
        {showExplanation}
        </span>

        { showExplanation && (
            <Card className="mt-3">
                <p className="card-title">Explanation</p>
                <div>
                    <p className="text-slate-900">{explanation}</p>
                </div>
            </Card>
            )}
    </>
  )
}
const MemoizedExplanation = memo(ExplanationCard)

MemoizedExplanation.displayName = 'ExplanationCard'

export default MemoizedExplanation