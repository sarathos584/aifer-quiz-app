import { memo } from "react"

const statusObj: {[key: string]: { [key: string]: string}} = {
    todo: { bg: 'bg-slate-300', color: 'text-black' },
    active: { bg: 'bg-red-300', color: 'text-white' },
    completed: { bg: 'bg-indigo-400', color: 'text-white' }
}

interface Props {
  value: number, 
  status: string
  id: string
}

const Bubble = ({ value, status, id }: Props) => {

  return (
    <div className={`w-[2.5em] h-[2.5em] rounded-full p-2 bg-red-400 grid place-content-center ${statusObj[status]?.bg ?? ""} ${statusObj[status]?.color ?? ""}`}>
        <span>{value + 1}</span>
    </div>
  )
}
const MemoizedBubble = memo(Bubble)
MemoizedBubble.displayName = 'Bubble'

export default MemoizedBubble