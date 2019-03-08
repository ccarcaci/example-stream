const http = require("http")
const https = require("https")
const url = require("url")
const fs = require("fs")

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/certs/privkey.pem`),
  cert: fs.readFileSync(`${__dirname}/certs/certificate.crt`),
}

var httpPort = 8080
var httpsPort = 4443

const routing = (request, response) => {
  const action = url.parse(request.url)

	if(action.pathname === "/") {
		response.writeHead(200, { "Content-Type": "text/plain" })
    response.write("Try with /big-file")
    response.end()
	} else if(action.pathname === "/big-file") {
    response.writeHead(200, { "Content-Type": "application/json" })

    const src = fs.createReadStream(`${__dirname}/big.file`)
    src.pipe(response)
  } else if(action.pathname === "/whole-file") {
    fs.readFile(`${__dirname}/big.file`, (err, data) => {
      if(err) { throw err }

      response.end(data)

      console.log("File sent!")
    })
  }
}

var httpServer = http.createServer((req, res) => routing(req, res))
var httpsServer = https.createServer(httpsOptions, (req, res) => routing(req, res))

httpServer.listen(httpPort, () => { console.log(`HTTP Server on port ${httpPort}`) } )
httpsServer.listen(httpsPort, () => { console.log(`HTTPS Server on port ${httpsPort}`) })

// Server functions
