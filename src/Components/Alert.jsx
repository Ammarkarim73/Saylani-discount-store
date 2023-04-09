import React from 'react'
import { Alert, Button } from '@mui/material'
import { useState } from 'react'

function MyAlert(props) {
    const [show, setShow] = useState(props.alert)
  return (
    <>
    {
        show?<Alert severity="success">{props.alertMsg} <Button onClick={()=>{setShow(false)}} variant="contained">Close</Button></Alert>:null
    }
    </>
  )
}

export default MyAlert