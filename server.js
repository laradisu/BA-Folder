var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);
  console.log(request.url);
  if(request.method == 'GET' && request.url == '/listings')  {
    //console.log("thisworks");
    response.end(JSON.stringify(listingData));
  }
  else {
    response.statusCode = 404;
    //response.statusMessage = ;3
    response.end('Bad gateway error');
  }

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: Explore the request object and its properties 
    HINT: Explore the response object and its properties
    https://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
    
    HINT: Explore how callback's work 
    http://www.theprojectspot.com/tutorial-post/nodejs-for-beginners-callbacks/4
    
    HINT: Explore the list of MIME Types
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 

    HINT: Check out this resource on fs.readFile
    //https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback

    HINT: Read up on JSON parsing Node.js
   */

    //Check for errors
    if (err) {
      throw err;
      console.log(data);
    }
    try {
        listingData = JSON.parse(data)
      }
    catch(err) {
        console.error(err)
      }

   //Save the sate in the listingData variable already defined
   //??

  //Creates the server
  var server = http.createServer(requestHandler);

  //Start the server
  // listening for requests on port 8080 - go to your browser and paste in http://127.0.0.1:8080
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    console.log('Server listening on: http://127.0.0.1:' + port);
  });

});
