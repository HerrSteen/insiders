let interval: ReturnType<typeof setInterval>
let windowHasFocus = true
// const audio = new Audio('notification.mp3')
// audio.play()

let baseTitle: string

export const notify = (header: string, body: string) => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      new Notification(header, { body: body });
    } else {
      console.log('Permission denied');
    }
  });

  if (windowHasFocus) return

  baseTitle = document.title
  interval = setInterval(() => {
    const title = document.title === baseTitle ? 'Uppdaterad' : baseTitle
    document.title = title
  }, 500)
}

const stop = () => {
  if (baseTitle) {
    document.title = baseTitle
  }

  clearInterval(interval)
}

window.onblur = function () {
  windowHasFocus = false
}

window.onfocus = function () {
  windowHasFocus = true
  stop()
}
