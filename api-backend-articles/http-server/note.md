# Build Your Own Web Server From Scratch In Node.JS

- The purpose of this is to understand the inner workings of how server work
- Network programming is the same as Socket programming is a way for programs to talk over a network
- A protocol is a way by which somethings communicate, the format in which the communication is done or the data is presented
- Http protocol is based on the TCP protocol
- The Transmission Control Protocol provides a communication service at an intermediate level between an application program and the Internet Protocol. [wiki](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)
- TCP is bidirectional channel for transferring bytes
- App -> TCP -> IP
- IP Layer consists of the sender address, receiver address and message data
- TCP uses a stream of bytes instead of packets unlike the UDP. UDP adds port numbers over IP packets
- TCP starts with a handshake
- address = IP + port
- there are 2 types of socket handles: listening and connection socket
- listening socket: binds & listens, accept, close
- Connection socket: read, write, close
-
