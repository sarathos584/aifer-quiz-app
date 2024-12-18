import dynamic from "next/dynamic"

const QuestionLeftView = dynamic(()=> import("@/views/QuestionLeftView"))
const QuestionRightView = dynamic(()=> import("@/views/QuestionRightView"))

const Home = () => {

  return (
    <main className="py-4">
      <section id='quiz' className="h-full bg-slate-100 min-h-[75vh] w-full] mx-auto max-w-[75vw] rounded-md px-4 py-3">
        <h3 className="text-center font-medium text-xl text-black mb-[1em]">Quiz Title</h3>
        <div className="flex gap-5">
          <QuestionLeftView/>
          <QuestionRightView/>
        </div>
      </section>
    </main>
  )
}

export default Home