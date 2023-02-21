export const requiredRule = (value: string) => {
  return (value !== null && value !== undefined && value !== '') || 'Required field'
}

export const emailRule = (value: string) => {
  return !!String(value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) || 'Email is not valid'
}

export const minLengthRule = (num: number) => {
  return (value: string) => {
    return value.length >= num || `Min length ${num}`
  }
}

export const maxLengthRule = (num: number) => {
  return (value: string) => {
    return value.length <= num || `Max length ${num}`
  }
}
