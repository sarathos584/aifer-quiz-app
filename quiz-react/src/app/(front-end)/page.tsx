import ExplanationCard from "@/components/ExplanationCard"
import QuestionCard from "@/components/QuestionCard"

const Home = () => {

  return (
    <main className="py-4">
      <section id='quiz' className="h-full bg-slate-100 min-h-[75vh] w-full] mx-auto max-w-[90vw] rounded-md px-4 py-3">
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
            
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home