function handleErr(err,req,res,next) {
  let message,statusCode
  switch(err.name) {
    case "Not Found" :
    statusCode = 404
    message = "Sesor Not Found"
    break
    case "Invalid Tokenn" : 
    statusCode = 401
    message = "Please login first"
  }

  res.status(statusCode).json({message})
}

module.exports = handleErr