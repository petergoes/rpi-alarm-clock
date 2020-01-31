const timeSubscribers = []
const alarmTimeSubscribers = []

let now;
let alarmTime = undefined

setInterval(() => {
  now = new Date(Date.now())
  timeSubscribers.forEach(fn => fn(now))
}, 1000)

module.exports = {
  notifyMeOnTime(fn) {
    timeSubscribers.push(fn)
  },
  unsubscribeMeFromTime(fn) {
    const index = timeSubscribers.indexOf(fn)
    if (index !== -1) {
      timeSubscribers.splice(index, 1)
    }
  },
  notifyMeOnAlarmTime(fn) {
    alarmTimeSubscribers.push(fn)
    if (alarmTime) {
      fn(alarmTime)
    }
  },
  unsubscribeMeFromAlarmTime(fn) {
    const index = alarmTimeSubscribers.indexOf(fn)
    if (index !== -1) {
      alarmTimeSubscribers.splice(index, 1)
    }
  },
  setAlarmTime(time) {
    alarmTime = new Date(time)
    alarmTimeSubscribers.forEach(fn => fn(alarmTime))
  }
}