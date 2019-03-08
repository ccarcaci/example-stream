const { Readable } = require("stream")

const inStream = new Readable()

inStream.push("ABCDEFGHIJKLM\n")
inStream.push("NMPQRSTUVWXYZ\n")
inStream.push(null) // End

inStream.pipe(process.stdout)
