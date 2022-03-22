import { useSelector } from 'react-redux'


  
function Spinner() {

  const { isLoading } = useSelector(
    (state) => state.auth
  )

  // const LoadingState = false

  // useEffect(() => {
  //   if (isLoading) {
  //     LoadingState = true
  //   }

  // }, [isLoading])


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

  