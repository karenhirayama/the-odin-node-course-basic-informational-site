import http from "node:http"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "node:url"

const server = http.createServer()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


server.on("request", (req, res) => {
  let filePath = ""
  switch (req.url) {
    case "/":
      filePath = path.join(__dirname, "index.html")
      break
    case "/about":
      filePath = path.join(__dirname, "about.html")
      break
    case "/contact-me":
      filePath = path.join(__dirname, "contact-me.html")
      break
    default:
      filePath = path.join(__dirname, "404.html")
      break
  }


  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log('err', err)
      filePath = path.join(__dirname, "404.html")
      fs.readFile(filePath, (err404, data404) => {
        if (err404) {
          res.writeHead(404, { "Content-Type": "text/plain" })
          res.end("404 Not Found")
          return
        }
        res.writeHead(200, { "Content-type": "text/html" })
        res.end(data404)
      })
      return
    }

    res.writeHead(200, { "Content-type": "text/html" })
    res.end(data)
  })
})

server.listen(8080, () => console.log("Server running on port 8080"))
