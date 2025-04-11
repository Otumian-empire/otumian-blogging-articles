# What is an API

I was reading a recommended book when I took an interest in programming. The book was "The Art and Science of C" by Eric S. Roberts. There are several chapters in the book. However, in this case, I will reference chapter 7: "Libraries and Interfaces: A Simple Graphics Library".

Under the topic, "The concept of an interface", the author describes an interface as a boundary between two distinct mediums. The author further mentioned that "in programming, an interface constitutes a conceptual boundary rather than a physical one and that an interface is the boundary between the implementation of a library and programs that use that library. Information passes across that boundary whenever functions in that library are called. The interface mediates and gives structure to the exchange of information between the library and its users. Conceptually, a programming interface also represents a shared understanding of the nature of that boundary, providing both creators and users of a library with the critical information they need to know".

**Some points to note from the above excerpt:**

- an interface is the boundary between the implementation of a library and programs that use that library: *a library can be a collection of the implementation of the business logic, making the program. The front-end, users of the front-end sometimes known as clients, use the library.*
- the interface mediates and gives structure to the exchange of information between the library and its users: *serves as an communication medium between the front-end and the back-end.*
- represents a shared understanding of the nature of that boundary: *dictates what kind of data comes in and what comes out - request and response*

**Adding onto the above points:**

- an interface is a boundary between the implementation of a library and programs that use that library (between the implementation of the business logic, the back-end, and the front-end)
- the interface mediates and gives structure to the exchange of information between the library and its users (serves as a communication medium between the front-end and the back-end)
- represents a shared understanding of the nature of that boundary (dictates what kind of data comes in and what comes out - request and response)

So, what is an API? Traditionally, we say an API is an Application Programming Interface.

- Application: We know what the applications here are. They are the front-end and the back end.
- Programming: Programming is done when we write the code. In the code we write, every action and event is dynamic.
- Interface: The interface, is how the applications communicate with each other

From what we have discussed so far and as mentioned by Eric S. Roberts, we can agree that an API, in this context, is a way that the front-end and the back-end communicate, right 😊️?