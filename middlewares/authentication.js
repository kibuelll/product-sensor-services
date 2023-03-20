async function authentication(req,res,next) {
  try {
    const {access_token} = req.headers;
    const dataAuth = await fetch("http://localhost:3001/auth-request",{
      method:'get',
      headers: {
        'Content-Type': 'application/json',
        access_token
      },
    })

    if(!dataAuth) {
      throw {
        name : "Invalid Token"
      }
    }

    const  auth = await dataAuth.json()
    req.user = {...auth};
    next();
  } catch (error) {
    // res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authentication;