const { Writable, Transform } = require("stream")

const outStream = new Writable({
  write(chunk, encoding, callback) {
    // Write to console
    console.log(chunk.toString())
    callback()
  }
})

const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

process.stdin.pipe(upperCaseTr).pipe(outStream)
