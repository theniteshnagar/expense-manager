import { useEffect } from "react"

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title}` : 'Expense Mananger'
  }, [title])
} 

export default usePageTitle;