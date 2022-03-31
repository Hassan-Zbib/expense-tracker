import { useSelector } from 'react-redux'


  
function Spinner() {

  const auth = useSelector(
    (state) => state.auth
  )

  const income = useSelector(
    (state) => state.income
  )

  const expense = useSelector(
    (state) => state.expense
  )

  const stats = useSelector(
    (state) => state.stats
  )

  const document = useSelector(
    (state) => state.stats
  )

  return (
    <>
      {

        auth.isLoading || income.isLoading  || expense.isLoading  || stats.isLoading || document.isLoading ? (
          <div className='loadingSpinnerContainer'>
          <div className='loadingSpinner'></div>
        </div>
        ) : null

      }
    </>
  )
}

export default Spinner

  