var socket;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
      socket = new Socket();

      socket.onData = function(data){
        console.log(data);
      };
      socket.onError = function(err){
        console.log(err);
      };
      socket.onClose = function(hasErr){
        if (hasErr)
          console.log(hasErr);
      };

      socket.open(
        "192.168.0.1",
        80,
        function(){
          app.connectedToSocket('deviceready');
        },
        function(err){
          app.connectionFailed('deviceready', err);
        }
      );
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    },
    connectedToSocket: function(id) {
      var parentElement = document.getElementById(id);
      var connectedElement = parentElement.querySelector('.connected');
      var receivedElement = parentElement.querySelector('.received');

      receivedElement.setAttribute('style', 'display:none;');
      connectedElement.setAttribute('style', 'display:block;');

      console.log('connection succeeded');
      var dataString = "Hello world";
      var data = new Uint8Array(dataString.length);
      for (var i = 0; i < data.length; i++) {
        data[i] = dataString.charCodeAt(i);
      }
      socket.write(data);
      socket.close();
    },
    connectionFailed: function(id,err) {
      var parentElement = document.getElementById(id);
      var connectedElement = parentElement.querySelector('.failed');
      var receivedElement = parentElement.querySelector('.received');
      var errMsg = parentElement.querySelector('.errmsg');

      receivedElement.setAttribute('style', 'display:none;');
      connectedElement.setAttribute('style', 'display:block;');
      errMsg.setAttribute('style','display:block');

      errMsg.innerText = err.toString();
      socket.close();
    }
};
