const express = require("express")

const app = express()

//routes
app.post("/",(req, res)=>{
	res.send(`We are on home posting`)
})
//start listening the server

app.listen(3500)