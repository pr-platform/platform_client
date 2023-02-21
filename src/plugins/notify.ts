import './notify.scss'

const baseOptions = {
  position: 'top-right',
  classes: 'notification',
}

export default ($q) => {
  return {
    error(options) {
      return $q.notify({
        type: 'negative',
        message: 'Error',
        ...baseOptions,
        ...options,
      })
    },
    success(options) {
      return $q.notify({
        type: 'positive',
        message: 'Success',
        ...baseOptions,
        ...options,
      })
    },
    warning(options) {
      return $q.notify({
        type: 'warning',
        message: 'Warning',
        ...baseOptions,
        ...options,
      })
    },
  }
}
