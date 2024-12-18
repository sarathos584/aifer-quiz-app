import { memo } from "react"


const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={` card bg-slate-100 shadow-lg bg-slate-100/30 rounded-md p-4 border-2 ${className}`}>
     {children}
    </div>
  )
}

const MemoizedCard = memo(Card)

MemoizedCard.displayName = 'Card'

export default MemoizedCard