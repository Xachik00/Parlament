interface ErrorMessageProps{
  error: string
}

export  function ErrorMessage({error}: ErrorMessageProps) {
  return (
    <div className='Error'>{error}</div>
  )
}