const net = require("net");

const app = net.createServer();

const PORT = process.env.PORT || 8080;

app.listen({ host: "0.0.0.0", port: PORT }, () => {
  console.log("Server running on port ======>", PORT);
});

app.on("connection", (clientToProxySocket) => {
  clientToProxySocket.on("data", (data) => {
    //Taking care of HTTP and HTTPS requests
    let isConnectionTLS = data.toString().indexOf("CONNECT") !== -1;
    let serverPort;
    let serverAddress;
    if (isConnectionTLS) {
      // Catering to HTTPS request
      serverPort = 443;
      serverAddress = data
        .toString()
        .split("CONNECT")[1]
        .split(" ")[1]
        .split(":")[0];
    } else {
      // Catering to HTTP request
      serverPort = 80;
      serverAddress = data.toString().split("Host: ")[1].split("\\n")[0];
    }

    let proxyToServerSocket = net.createConnection(
      {
        host: serverAddress,
        port: serverPort,
      },
      () => {
        console.log("Proxy connected to server");
      }
    );
    if (isConnectionTLS) {
      clientToProxySocket.write("HTTP/1.1 200 OK\\r\\n\\n");
    } else {
      proxyToServerSocket.write(data);
    }
    clientToProxySocket.pipe(proxyToServerSocket);
    proxyToServerSocket.pipe(clientToProxySocket);

    proxyToServerSocket.on("error", (err) => {
      console.log("Proxy to server error");
      console.log(err);
    });
    clientToProxySocket.on("error", (err) => {
      console.log("Client to proxy error");
    });
  });
});

app.on("close", () => {
  console.log("Connection closed");
});

// app -> net.Server
// clienySocket -> net.Socket
