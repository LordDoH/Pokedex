import { useState } from 'react'

export const useForm = (initialState) => {
  const [state, setState] = useState(initialState)

  const onChange = (field, value) => {
    setState({ ...state, [field]: value })
  }

  const resetForm = () => {
    setState(initialState)
  }

  return { ...state, onChange, resetForm, form: state }
}
