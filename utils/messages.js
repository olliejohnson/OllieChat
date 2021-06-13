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
  console.log(message)
  messages.push(message)
}

function loadMessages() {}

module.exports = {
  formatMessage: formatMessage,
  saveMessage: saveMessage,
  loadMessages: loadMessages,
}
