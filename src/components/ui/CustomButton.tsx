import { CircularProgress, Button } from '@material-ui/core'
import React from 'react'

function CustomButton({title="Submit", color="primary", isLoading=false, type="submit", isDisabled=false}) {
  return (
    !isLoading ? (
      <Button href='' variant="contained" type={type} color='primary' disabled={isDisabled}>
          {title}
      </Button>
    ):(
      <Button
      disabled={isDisabled}
      variant="contained"
      className='py-2'  
      color='primary'
      type='button'
      >
       {title}
      </Button>
    )
  )
}

export default CustomButton