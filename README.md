# User Authentication using node js (session and cookies)

On a high level, in a request-response cycle in an application, after this cycle gets completed, the server forgets about the client.

So, in order to keep track of users, whenever a first request is made, a session object gets stored in the database, and the session ID corresponding to it is sent back as cookie.
Now the user and the server are always kept in sync based on the values stored in session and user while making that request can always refer back to the corresponding session stored in the server with the help of session ID stored in its cookie.