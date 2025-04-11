# What is REST API

An API is an Application Programming Interface. I mean that is what API stands for. Previously we discussed what an API is (or might be) and here we will go further and look at what a RESTful API is.

### What is a RESTful API?

Hearing REST API and RESTful API should not confuse you. They are the same thing, just grammar.

RESTful API is an API designed to follow the REST architectural style. That is what a mere Google search will say. So, what then is the REST architectural style? Or what makes an API a RESTFful API?

### What makes an API RESTful?

REST architectural styles are constraints that suggest ways to design APIs. REST stands for REpresentational State Transfer. This style was designed by [Roy Fielding](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm). By these constraints, we understand that RESTful APIs have these qualities:

-   Uniform interface: When the same request is made to some endpoint, X, the response should be the same irrespective of the source and it must have the needed data the request requires.
-   Client-server decoupling: The client and the server must be independent of each other. The client should only interact with the server via the URI or URL and the server shouldn't modify the client application.
-   Statelessness: A request must have all the necessary information for it to be processed by the server. The server must not store any information about a client’s request.
-   Cacheability: Resources (or responses) from their server should be cachable on the client side or the server side. The server-side responses need to contain information about whether caching is allowed for some resources.
-   Layered system architecture: There are several interceptors in an API call and as such one should design the API in a way that neither the client nor the server can tell whether it is communicating with the end application or a proxy.
-   Code on demand (optional): APIs send static resources but there are cases where responses contain executable codes (java applets) where the code is executed on demand.

Well, it is not that we can understand all these. Not all of us, I suppose.

### NOTES

-   Uniform interface: this is similar to the keyboard. When you press down on ‘A’, ‘A’ should be displayed. When you press on ‘b’, ‘B’ should not display.
-   Client-server decoupling: this means separating the backend code from the frontend code. Do not mix them and do not let one depend on the other to a point where one change in the the frontend requires that the backend should change or is changed. Let the two applications be free from each other and only communicate via some established URL
-   Stateless: Assume a user was trying to access some resource at some point and an error occurred during the processing of the request. When another request is made (same request), it should start from scratch. It should not pick up from where the error occurred. In essence, every request is unique. Request A doesn’t interact not interfere with Request B.
-   Cachability: Create caches of responses by saving the responses for some particular requests somewhere and then later access this data when the client wants the same resource. Either the server or the client application can create this cache. Some resources do not need to be cached and in this case, the server-side application (the API) should indicate it.
-   Layered system architecture: Some services rely on other services. So when you make a request to service A, then service A also makes or could be making a request to service B and so on. Imagine you are using a payment process and you are supposed to make payment with a Visa card or something similar. The platform you are using only trades using the Visa card but do not directly do the transaction with the card. They don’t or can’t deduct the payment from the card directly. They have to make a request to another service to make the payment
-   Code on demand: As it is at the top.

### How simple is it to create RESTful APIs?

Where there is a RESTful API, HTTP verbs are common. Database actions are mapped to HTTP verbs. We can create, read, update and delete data from the database, and in a RESTful API we map these actions to the HTTP verbs, POST, GET, PUT and DELETE respectively.

| DB Action | HTTP Verb |
| --------- | --------- |
| CREATE    | POST      |
| READ      | GET       |
| UPDATE    | PUT/PATCH |
| DELETE    | DELETE    |

### What are some advantages of RESTful APIs?

REST APIs are:

-   flexible
-   scalable
-   independent
-   language-agnostic
-   etc (etc is not an advantage 😂️)

### Can we deviate from this style?

Well, it is an API that follows the REST architectural style. Adhering to it will bring you more good than harm. However, since it is more of a suggestion of how best to design your APIs, yes, we can deviate from this style. Remember, you own your business requirements.

We shall discuss more about HTTP verbs and databases in general in the future.

## Here some resources

-   [restful-api](<https://aws.amazon.com/what-is/restful-api/](https://aws.amazon.com/what-is/restful-api/)>)
-   [what-is-a-rest-api](<https://www.redhat.com/en/topics/api/what-is-a-rest-api](https://www.redhat.com/en/topics/api/what-is-a-rest-api)>)
-   [stateful-vs-stateless](<https://www.redhat.com/en/topics/cloud-native-apps/stateful-vs-stateless](https://www.redhat.com/en/topics/cloud-native-apps/stateful-vs-stateless)>)
-   [https://www.ibm.com/topics/rest-apis](https://www.ibm.com/topics/rest-apis)
-   [https://www.rfc-editor.org/rfc/rfc6749](https://www.rfc-editor.org/rfc/rfc6749)
-   [Representational State Transfer (REST)](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
-   [https://blog.postman.com/rest-api-examples/](https://blog.postman.com/rest-api-examples/)
