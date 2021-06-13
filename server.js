const express = require("express")
const http = require("http")
const app = express()
const socket = require("socket.io")
const m = require("./utils/messages")
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users")

const server = http.createServer(app)
const io = socket(server)

const messages = []

app.use(express.static("public"))

const botName = "ChatCord Bot"

io.on("connection", socket => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room)

    socket.join(user.room)

    socket.emit("message", m.formatMessage(botName, "Welcome to ChatCord!"))

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        m.formatMessage(botName, `${user.username} has joined the chat`)
      )

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    })
  })

  socket.on("chatMessage", msg => {
    const user = getCurrentUser(socket.id)
    const newMessage = m.formatMessage(user.username, msg)
    m.saveMessage(newMessage, user.room)

    io.to(user.room).emit("message", newMessage)
  })

  socket.on("disconnect", () => {
    const user = userLeave(socket.id)

    if (user) {
      io.to(user.room).emit(
        "message",
        m.formatMessage(botName, `${user.username} has left the chat`)
      )

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      })
    }
  })
})

server.listen(process.env.PORT || 3000)
