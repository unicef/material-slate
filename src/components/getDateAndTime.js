export default function getDateAndTime(dt, format) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const mons = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const date = dt || new Date()

  let w = days[date.getDay()]
  let M = mons[date.getMonth()]
  let d = addZero(date.getDate())
  let y = date.getFullYear()
  let h = addZero(date.getHours(), 2)
  let m = addZero(date.getMinutes(), 2)
  let s = addZero(date.getSeconds(), 2)
  let ms = addZero(date.getMilliseconds(), 3)
  let t = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  function addZero(x, n) {
    while (x.toString().length < n) {
      x = '0' + x
    }
    return x
  }

  let fullDateWithMilliseconds =
    w + ' ' + M + ' ' + d + ' ' + y + ' ' + h + ':' + m + ':' + s + ':' + ms

  let dateAndTime
  switch (format) {
    case 'fullDate':
      dateAndTime = fullDateWithMilliseconds
      break
    case 'date-time':
      dateAndTime = d + ' ' + M + ' ' + y + ' ' + t
      break
    case 'date':
      dateAndTime = d + ' ' + M + ' ' + y
      break
    case 'time':
      dateAndTime = t
      break
    case 'timestamp':
      dateAndTime = Date.parse(fullDateWithMilliseconds)
      break
    default:
      dateAndTime = d + ' ' + M + ' ' + y + ' ' + t
  }
  return dateAndTime
}
