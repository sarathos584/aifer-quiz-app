export type Question = { 
    _id: string
    question: string
    options: string[]
    answer: string
    explanation: string,
    status?: string
}