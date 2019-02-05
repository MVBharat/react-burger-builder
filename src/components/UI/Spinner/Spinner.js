import React from 'react'
import classes from './Spinner.css'

const spinner = () => (
    <div className={classes.Loader}>Loading...
        {console.log("spinner laoding...")}
    </div>    
    
)

export default spinner