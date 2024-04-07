# Froxy

Froxy dives into creating a forward proxy from scratch in JS using Node.

Now you may ask what is a Forward Proxy?

Let me explain,


A **forward proxy** is a machine that sits in between the client and the server and intercepts any requests made by the client.

With this type of proxy brings in some additional benefits like **Caching, User security** and **anonymity**.

### A bit of explanation for the same: 
- **Caching**: Requests from the server can be cached at the proxy so in case a user/client visits the host again instead of forwarding the request to the server the cached result can be provided to the client

- **User anonymity**: Multiple clients/users can connect through a proxy, so a request is sent through the proxy instead of the client, so there is no way for a server to know from which user the request was sent.

- **User security**: Access of malicious content/websites can be blocked directly through a proxy.

