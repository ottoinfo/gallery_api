import Socket from  "socket.io"

module.exports = function(app) {
  const port = 3333
  const socket = Socket(port)

  socket.on("connection", function(connection) {
    console.log("a user connected")
    connection.on("disconnect", function() {
      console.log("user disconnected")
    })
    connection.emit("global", { msg: "hey" })
    connection.emit("user_channel", { msg: "user_id" })
  })

  console.log("sockets listening on *:" + port)

  return socket
}