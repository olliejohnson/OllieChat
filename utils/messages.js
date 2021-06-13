const moment = require("moment")

function formatMessage(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  }
}

let messages = []

function saveMessage(message, room) {
  messages.push(message)
}

function loadMessages(room) {
  return messages
}

module.exports = {
  formatMessage: formatMessage,
  saveMessage: saveMessage,
  loadMessages: loadMessages,
}
