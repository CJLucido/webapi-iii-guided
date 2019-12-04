refactor things so they are immediately intelligible for others

##Middleware - an assembly line the car is the req and then the res, robots handling the functions are the middleware
an over loaded term so the above definition is for EXPRESS middleware


There are two types

-normal
-error handling

can come from different sources:
built-in: included with express
third party: need to be installed separately
custom: we write it

we can use it:
globally: is applied to all endpoints
locally: is only applied to a specific endpoint or group of endpoints

Middleware can:

inspect the req and res objects
make changes to the req and res objects
move the req or res object to the next middleware in the queue
stop the req and send back a res to the client

Middleware is like a router with an extra homie (next)


dont let people know what language you are using for your api, security reasons

using helmet for security here 

use npmjs.com to search for good libraries (or vulnerabilities/bad ones)

expressjs.com
    api reference
        request
                req.originalUrl
                