const axios = require("axios")
const fs = require("fs")
const path = require("path")
const propertiesParser = require("properties-parser")

let props
let dotFile
let apiKey

const getApiKey = async () => {
  try {
    dotFile = await fs.readFileSync(
      path.join(process.env.HOME || process.env.USERPROFILE, ".ethp")
    )
    props = propertiesParser.parse(dotFile)
    apiKey = props.API_KEY
    const res = await axios.get(
      `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${
        apiKey
      }`
    )
    console.log(`\x1b[36m%s\x1b[0m`,`Current price: $${res.data.result.ethusd}`)
    console.log(
      `\x1b[36m%s\x1b[0m`,`Last update: ${new Date(res.data.result.ethusd_timestamp * 1000)}`
    )
  } catch (err) {
    console.log("Please define your .ethp file in $HOME/.ethp!")
  }
}

getApiKey()
