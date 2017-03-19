import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)

function DATASOURCE(socketEndpoint = "http://localhost:8080", dispatch = "") {
  const self = this;
  this.socket = io(socketEndpoint, {
    'forceNew': false,
    'reconnect': false,
    transports: ['websocket']
  });
  this.socket.on('connect', (details) => {
    self.connected = true;
    dispatch({type: "CONNECTED"})
  });

}

DATASOURCE.prototype.connected = false;
DATASOURCE.prototype.socketID = null;
DATASOURCE.prototype.retryNums = 0;
DATASOURCE.prototype.retry = true;


module.exports = (dispatch) => {
  //when you have an actual site running on Heroku or something, change the endpoint
  return new DATASOURCE("http://localhost:8080", dispatch);
}
