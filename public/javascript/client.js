const socket = io.connect('http://localhost:3000');
const currentTimeElement = document.querySelector('[data-current-time]')
const currentDateElement = document.querySelector('[data-current-date]')
const alarmTimeElement = document.querySelector('[data-alarm-time]')

socket.on('currenttime', function (time) {
  const now = new Date(time)
  currentTimeElement.innerText = now.toLocaleTimeString()
  currentDateElement.innerText = now.toLocaleDateString()
});

socket.on('alarmtime', function (time) {
  const now = new Date(time)
  alarmTimeElement.innerText = now.toLocaleTimeString()
});
