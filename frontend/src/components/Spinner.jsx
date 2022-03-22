import { useSelector } from 'react-redux'


  
function Spinner() {

  const { isLoading } = useSelector(
    (state) => state.auth
  )

  return (
    <>
      {

        isLoading ? (
          <div className='loadingSpinnerContainer'>
          <div className='loadingSpinner'></div>
        </div>
        ) : null

      }
    </>
  )
}

export default Spinner

  