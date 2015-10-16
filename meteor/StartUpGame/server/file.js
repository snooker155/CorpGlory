// server/file.js
if (Meteor.isServer) {

 
var ddpclient = new DDPClient({
  // All properties optional, defaults shown 
  host : "10.25.2.190",
  port : 8888,
  ssl  : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',  // ['1', 'pre2', 'pre1'] available 
  // uses the SockJs protocol to create the connection 
  // this still uses websockets, but allows to get the benefits 
  // from projects like meteorhacks:cluster 
  // (for load balancing and service discovery) 
  // do not use `path` option when you are using useSockJs 
  useSockJs: true,
  // Use a full url instead of a set of `host`, `port` and `ssl` 
  // do not set `useSockJs` option if `url` is used 
  url: 'wss://10.25.2.190:8888/'
});
 
/*
 * Connect to the Meteor Server
 */
ddpclient.connect(function(error, wasReconnect) {
  // If autoReconnect is true, this callback will be invoked each time 
  // a server connection is re-established 
  if (error) {
    console.log('DDP connection error!');
    return;
  }
 
  if (wasReconnect) {
    console.log('Reestablishment of a connection.');
  }
});
 
  console.log('connected!');

 


/*
 * Close the ddp connection. This will close the socket, removing it
 * from the event-loop, allowing your application to terminate gracefully
 */
ddpclient.close();
 
/*
 * If you need to do something specific on close or errors.
 * You can also disable autoReconnect and
 * call ddpclient.connect() when you are ready to re-connect.
*/
ddpclient.on('socket-close', function(code, message) {
  console.log("Close: %s %s", code, message);
});
 
ddpclient.on('socket-error', function(error) {
  console.log("Error: %j", error);
});
 


}