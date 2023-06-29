import { CircularProgress, Button } from '@material-ui/core'
import React from 'react'

function CustomButton({title="Submit", color="primary", isLoading=false, type="submit"}) {
  return (
    !isLoading ? (
      <Button variant="contained" type={type} color={color}>
          {title}
      </Button>
    ):(
      <Button
      disabled
      variant="contained"
      className='py-2'           
      >
        <CircularProgress size={20} color='primary' />
      </Button>
    )
  )
}

export default CustomButton