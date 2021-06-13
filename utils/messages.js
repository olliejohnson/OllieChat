const moment = require("moment")

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  }
}

let messages = {}

function saveMessage(message, room) {
  messages[room].push(message)
}

function loadMessages(room) {
  if (!(room in messages)) {
    messages[room] = []
  }
  return messages[room]
}

module.exports = {
  formatMessage: formatMessage,
  saveMessage: saveMessage,
  loadMessages: loadMessages,
}
