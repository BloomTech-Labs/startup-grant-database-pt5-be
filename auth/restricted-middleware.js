//Import firebase admin
const firebase = require('../initializers/firebase');

//Creating midddleware so if the token is verify successfully
//next will be call and the authentication process will be successful
module.exports = (req, res, next) => {
  //get current token from body
  const idToken = req.body.idToken;
  //   console.log('Token from middleware: ', idToken);
  // idToken comes from the client app
  if (idToken) {
    firebase
      .auth()
      .verifyIdToken(idToken)
      .then(function(decodedToken) {
        // ...
        //set decoded token to body to catch the data during the next face and send it to DB
        req.body.decodedToken = decodedToken;
        // console.log('Decoded Toke from middleware: ', decodedToken);
        next();
      })
      .catch(function(error) {
        // Handle error
        console.log('Error from middleware decoding token failed', error);
        res.status(401).json({ message: 'invalid Token', error });
      });
  } else {
    // console.log('No token found in middleware');
    res.status(500).json({ message: 'No token found', error });
  }
};
