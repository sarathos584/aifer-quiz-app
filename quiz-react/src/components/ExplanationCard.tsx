'use client'

import { memo, useCallback, useMemo, useState } from "react"
import Card from "./Card"

const ExplanationCard = ({ explanation }: { explanation: string }) => {

  const [showExplanation, setShowExplanation] = useState<boolean>(false)

  const toggleExplanation = useCallback(()=> {
    setShowExplanation(prev => !prev)
  }, [])

  const buttonText = useMemo(() => (showExplanation ? 'Hide' : 'Show') + ' Explanation', [showExplanation]);

  return (
    <>
    <span  
     className="underline underline-offset-4 font-normal text-indigo-400 cursor-pointer" 
     onClick={toggleExplanation}
     >
      {buttonText}
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