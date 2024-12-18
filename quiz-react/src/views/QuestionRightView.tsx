import dynamic from "next/dynamic"
import Link from "next/link"
import Card from "@/components/Card"

const Bubble = dynamic(()=> import("@/components/Bubble"))

const QuestionRightView = () => {
  
  return (
    <div className="basis-[30%] bg-purple-100 min-h-[70vh]">
        <Card className="min-h-full">
            <div className="card-header flex justify-between items-center text-slate-950 mb-6">
            <p>Question 1/8</p>
            <Link href={'/'}>Need Help?</Link>
            </div>
            <div className="card-content grid grid-cols-5 gap-2 place-items-center">
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="todo"/>
            <Bubble value={1} status="completed"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            <Bubble value={1} status="active"/>
            </div>
        </Card>
    </div>
  )
}

export default QuestionRightView