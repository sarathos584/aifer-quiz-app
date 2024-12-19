import Header from "@/components/Header"
import { QuestionsProvider } from "@/contexts/QuestionsProvider"



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Header/>
    <QuestionsProvider>
      {children}
    </QuestionsProvider>
    </>
  )
}

export default Layout