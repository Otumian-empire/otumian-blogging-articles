# Request and Response

In the context of an **API**, the communication between a **server** and the **client**, or a server and another server, is done via request and response.

Let's assume in this case that the first entity to initiate the communication is the client. The second entity to respond to the communication is the server. So at the end of the day, the client sends a request to the server and then the server responds (replies) with a response.

### What is a request?

The word request means to ask for something. Usually, the thing being asked for is a resource from a server. in this case. Whoever is making the request does not have direct access to the resource and as such “asks” from the server. It is not always that a request is made to retrieve data via some URL. It can be done to create a new record, to update it or to delete it.

A request is more or less like an order, an order at a restaurant. When you to a restaurant and a waiter comes to your table and takes your order. The order is taken to the counter (kitchen). The order is then assigned to a chef. The chef prepares the meal and then the waiter delivers the meal to you, who ordered it. The content of the order is like a request or, it is the request. The request is fulfilled when the order to prepare a certain meal that consists of mashed potato and some chicken and hot sauce is made and delivered to you.

### Examples of requests

Let's assume we have a Todo app. Then some of the requests that we can make might be:

-   Create Todo
-   Update Todo
-   Read a Todo
-   Read (list) Todos
-   Update a Todo
-   Update (a list of) Todos
-   Delete Todo
-   Delete (a list of) Todos

Even though the above list seems exhausted of the actions that can be done on a Todo, there could be more. If you noticed, the requests that can be done all seem to be related to database actions (CRUD) and in fact, they are. They are guided by some HTTP verbs.

For instance, our Todo app requires that when the task is done, one needs to set the status of the Todo to done, completed or successful. Then you need to make a request to the server telling it that we want to update this particular Todo, for its task is done. For this, we can add the request that updates the status of the Todo.

Let's consider another system that is more complex than a Todo app, a blogging platform like [dev](https://www.notion.so/dev.to).

In the todo app, the system was revolving around the task that needs to be done. Our Todo had a task and also a status. For a blogging platform, the system will revolve around: users, articles, comments, likes, reactions, followers, tag lists, etc. We will limit the request to just the users and the articles.

**Some of the requests we can have based on the user are:**

-   Sign up a user (this is the same as creating the user)
-   Log in a user
-   List all users
-   Read a user by ID
-   Search for a user by name
-   Verify user account
-   Update user record (this is more less the personal information of the user)
-   Reset user password
-   Reset user primary email (this could be the case where a user wants to change their email and that email isn't used in the login process)
-   Suspend or deactivate user account

**Some of the requests we can have based on the article are:**

-   Create an article (this is done by a user)
-   List articles (this could be done based on some tags or options - this could be feeds that everyone sees whether logged in or not)
-   List articles by some user (this is when you visit some user's page and then you see the articles they've written)
-   List articles by the logged-in user (this could be the articles that you see on your dashboard when you log in)
-   Read an article by ID or slug (slug is like the title of the article with ‘-’ used in place of the white spaces)
-   Search article by title or keywords (this may include the slug)
-   Update article
-   Delete article

### What makes a request?

What are the characteristics of a request? What are the properties of a request? What are the features of a request? What makes up a request? I want to say, that all these questions are the same.

From the order scenario where a customer goes to an eatery and the waiter takes their order and then delivers their meal, there were a lot of details in there that we didn't mention. We already know that the order that was taken is what makes up the request but what are the features of the request that makes it just unique to the one who made the request?

-   The content of the request that was recorded (request body or data)
-   In a way, the waiter was (is) able to know who (which table) ordered what, so this way the orders won’t be mixed up. I won’t be happy when my mashed potato and chicken with hot sauce is given to some stranger (metadata or header data)
-   The order was taken to the kitchen, where the chef prepares your meal based on the order and any other directives (URL)
-   It took some finite time for the order to be prepared. We can not wait for more than two hours for the meal to be prepared, that is unacceptable, we have other things to do (timeout)
-   There was payment made but wasn't mentioned. There could be even a tip
-   The customer could have been a regular customer but it wasn't mentioned. The waiter might know this customer to be a mashed potato-grilled chicken guy. So the usual is served 🙂️. (Caching)
-   The customer could have mentioned that olive oil was to be used to fry the chicken or maybe the potato should just be 80% cooked. Something that came with a request. (pagination or query strings to parse the response)

Generally, a request has some features, we can call them properties or characteristics, that make the request complete.

**A request may have the following properties:**

-   Request method: these are the HTTP verbs used when making a request. We have seen some of them already which are: `POST`, `GET`, `HEAD`,`PUT`, `PATCH`, `DELETE`
-   URL: this is also known as an endpoint or a route. It points to the server. This is similar to where the other was taken to by the waiter after recording it
-   Data: this refers to the order that was written down or recorded by the waiter. It dictates the information that the customer wants to send to the kitchen, to the chef. In an API, data can be passed via the request: `body`, `header`, or as part of the URL as a `query param` also known as a `query string` or path param.

**There are several formats that we can present their request `body`:**

-   `form-data`, where we can upload an image or a file to be precise
-   `GRAPHQL`
-   `plaintext`
-   `xml`
-   `json`
-   etc.

And if you don't know yet, 😎️ we'd be using `json`.

### HTTP verbs

HTTP verbs are the same as request methods. We know that these HTTP verbs a mapped to database actions. The table below should look familiar.

| **HTTP VERBS** | **USES**                                   |
| -------------- | ------------------------------------------ |
| `POST`         | Create a new record                        |
| `READ`         | Read/list a record or                      |
| `HEAD`         | Check the server status - no response body |
| `PUT`          | Update record (usually the whole record)   |
| `PATCH`        | Update record (usually the a part record)  |
| `DELETE`       | Delete record                              |

### What is a response

With the order analogy, the meal that we get after the order is prepared is the response. So the feedback or result that will be obtained from making a request is known as a response.

Just like a request, a request also has some features. A response has:

-   Status code: a number that tells the client what happened with their request, whether it was processable, processed or not processed
-   Headers: this has some data about the request and response. Usually some metadata.
-   Response body: The response body is the data that the client requested. Be it a list of records about some dog breed or french fries and desserts.

**The response body**

The response body could vary. Usually, the variation is based on the system that you are using or the kind of request that was made. Their format is also defined by the engineers and also what they are building. Some responses will contain a message: ‘Account updated successfully’, giving you textual feedback on the action that took place. Others return a key-value pair of information on a user or article, etc. And some requests have no response body at all.

**Status codes**

You can read on status code from [mozilla](<[https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)>). However, from this list, I used just these. My reason is that some of the status codes are too detailed. So I just stick to these.

| STATUS CODE | NAME                  | MEANING                                                                                     |
| ----------- | --------------------- | ------------------------------------------------------------------------------------------- |
| `200`       | OK                    | Request succeeded                                                                           |
| `201`       | CREATED               | A success request and a record has been created                                             |
| `400`       | BAD REQUEST           | An error occurred with the request                                                          |
| `401`       | UNAUTHORIZED          | An error occurred because the no or wrong authentication credentials were used              |
| `403`       | FORBIDDEN             | The client has inadequate permissions to access some resources because of some access level |
| `404`       | NOT FOUND             | Resource not found                                                                          |
| `500`       | INTERNAL SERVER ERROR | An error occurred while processing a request but this time it is an error from the server   |

### Sample requests and their response

Let’s create a sample request and response for the Todo App. From above we know that the todo app has two fields (that we mentioned): task and status. We can add the id to it. So if we are to model a Todo record, it will look like this:

```json
{
    "id": 1,
    "task": "Eat mashed potato-grilled-chicken with hot sauce",
    "status": "Pending"
}
```

-   the `id` is a number for this instance
-   the `task` is a string that indicates what we want to do
-   the `status` indicates the state of the `task` , whether it is `Done` or not, where it is `Pending`

**Create Todo**

```bash
POST /todos
Content-Type: application/json

{
    "task": "Eat mashed potato-grilled-chicken with hot sauce"
}
```

```json
Headers
Status Code 201 CREATED

Body
{
	"message": "Task added successfully"
}
```

**Read a Todo by id**

```bash
GET /todos/1
```

```json
Headers
Status Code 200 OK

Body
{
	"id": 1,
	"task": "Eat mashed potato-grilled-chicken with hot sauce",
	"status": "Pending"
}
```

**Read (list) Todos**

```bash
GET /todos
```

```json
Headers
Status Code 200 OK

Body
[
	{
		"id": 1,
		"task": "Eat mashed potato-grilled-chicken with hot sauce",
		"status": "Pending"
	},
	{
		"id": 2,
		"task": "Drink coffee with no sugar at 10:15 am facing the window",
		"status": "Pending"
	}
]
```

Update Todo

```bash
PUT /todos/1
Content-Type: application/json

{
    "task": "Eat mashed potato-grilled-chicken with hot sauce and water"
}
```

```json
Headers
Status Code 200 OK

Body
{
	"message": "Task updated successfully"
}
```

**Delete Todo**

```bash
DELETE /todos/1
```

```json
Headers
Status Code 200 OK

Body
{
	"message": "Task deleted successfully"
}
```

### Discussion

-   When the client tries to access an endpoint that does not exist, do you send `400 Bad Requests`, `404 Not Found` or `500 Internal Server Error`?
-   When the client tries to access some record by ID and there is no record by that ID or keyword, do you send `200 OK`, with a message that says ‘Record not found’, `400 Bad Request` with the same message or `404 Not Found`, with the same message as the others, _‘Record not found’_?

### Further reading

-   [http.dev](<[https://http.dev/](https://http.dev/)>)
-   [mozilla-http-status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
-   [https://developer.mozilla.org/en-US/docs/Web/HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status))
