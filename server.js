//libraries, local files, middleware, endpoints ORDER MATTERS
//LIBRARIES
const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')// include out of the box on ALL projects

//LOCAL FILES
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();


//MIDDLEWARE - on every request that comes into the server, the middleware ESTABLISHED ON THE SERVER will run (meaning it is global)
//can also server.use(helmet(), express.json(), etc)
//server.use(helmet())//using helmet globally, third party middleware
server.use(express.json()); //built-in middleware
server.use(logger)//will change all routes to it (when not using next())

server.use('/api/hubs', checkRole('admin'), hubsRouter);//the router is also local middleware because it only applies to /api/hubs

//custom middleware

function logger(req, res, next) {//next is like a button that if pressed the req moves to the next function or route handler
  console.log(`${req.method} to ${req.originalUrl}`)
  //res.send("all good")
  next()//allows the req to continue to the next miiddleware or route handler
}

//write a gatekeeper middleware that reads a password from the headers and if the password is "mellon", let it continue
//if not, send back status code 401 and a message. use it for area51

function gatekeeper(req, res, next){
  const password = req.headers.password //everything that you read from url or headers will be a string

  if(password && password.toLowerCase() === "mellon"){
    next()
  }else{
    res.status(401).json({message: "you don't have clearance"})
  }

}

//making middleware dynamic (needing to invoke it in the endpoint)

function checkRole(role){
  return function(req, res, next){
    if(role && role === req.headers.role){
        next()
    }else{
      res.status(403).json({message: "can't touch this"})
    }
  }
}


//ENDPOINTS
//can also put next below (in crud ops) with the other two homies but on that route there is nothing that happens after. If we hadn't called send thennext is by default called even if not written in, but again, there is nothing to do next here
server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';
//next() would go here before send
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});


//shift+ alt plus up or down to copy the selected lines
//can also use helmet() as second arg below (locally)
server.get("/echo", (req, res)=> {
  res.send(req.headers)
})

server.get('/area51', helmet(),  gatekeeper, checkRole('agent'), (req, res)=> {
  res.send(req.headers)
})

module.exports = server;

//putting a period after a word is a good test for if something exists


//reminder: arrow functions will not hoist

//optimize for readability not less lines of code!!! "please, please, please" - Luis Hernandez (nesting arrow functions can get very complicated for someone who isn't as familiar with the syntax)