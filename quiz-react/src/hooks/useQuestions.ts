import useSWR from "swr";



const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useQuestions(key: string) {
  const { data, error, isLoading } = useSWR(
    key ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/questions/${key}` : null, 
    fetcher
  );
  return {
    questions: data?.data,
    isLoading,
    isError: error,
  };
}

export default useQuestions;
