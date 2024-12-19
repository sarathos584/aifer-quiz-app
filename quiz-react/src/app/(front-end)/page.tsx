'use client'

import dynamic from "next/dynamic"

const QuizPage = dynamic(()=> import( "@/pages/QuizPage"))

const Home = () => {


  return (
    <main className="py-4">
      <QuizPage/>
    </main>
  )
}

export default Home