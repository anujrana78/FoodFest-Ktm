import { useState } from "react"

const useInput = (validate) => {
    const [enteredData,setEnteredData] = useState('')
    const [enteredDataIsTouched,setEnteredDataIsTouched] = useState(false)

    const isValid = validate(enteredData)
    const hasError = !isValid && enteredDataIsTouched

    const handleEnteredData = (event) => {
        setEnteredData(event.target.value)
    }

    const onBlurChangeHandler = (event) => {
        setEnteredDataIsTouched(true)
    }

   const reset = () => {
    setEnteredData('')
    setEnteredDataIsTouched(false)
   }

    return {
        value : enteredData,
        handleEnteredData,
        isValid,
        onBlurChangeHandler,
        hasError,
        reset
    }
}

export default useInput