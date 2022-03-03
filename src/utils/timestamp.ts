export const Timestamp  = () => {
  const today = new Date()

  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const hours = today.getHours()
  const minutes = today.getMinutes()

  const currentTime =
    year + '-' + month + '-' + date + ' ' + hours + ':' + minutes

  return { currentTime }
}