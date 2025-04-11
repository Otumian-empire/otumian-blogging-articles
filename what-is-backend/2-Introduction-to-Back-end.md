# Introduction to Back-end

## What is a back-end?

In web application development, there is the front end. It refers to what users see and interact with. There are buttons, links, forms, images, lists, tables and others that the user interacts with for some reason.

For instance, when one wants to create a [DEV](http://dev.to/) account, one would fill out a form and provide some personal details that may include one’s email and password. Somewhere on that same form, there would be a button that may say, “sign up” or “submit”. The user clicks the button and a request is sent to the back-end. Assuming the process was a success, the user would be redirected to another page to continue the registration process or might even be taken to the main page to read some articles. There are situations where one would have to do some verification immediately after creating an account. There would be input fields and texts and buttons and links and icons and others.

You can visit the Forem sign-up page here, [forem sign-up page](https://account.forem.com/users/sign_up), to see and experience the “front end”.

So, one may ask, what is the back-end?

When the form is submitted, where is it saved? How is it even saved? How did the application even know that you provided the right credentials to log in or even create an account? How did you get the verification email? Where are the articles, comments, likes and whatnot, are stored? How is it done? Well, simply put, the whole why and how, is the back-end. The back-end is part of the web application that the user doesn’t see nor directly interact with. The back-end is responsible for validating and creating user accounts, it is responsible for logging in, it is responsible for saving, reading, updating and deleting articles, and comments.

We would say that the back-end contains the business logic of the web application. What is the app supposed to do? The back end is meant for that. So when you click on the follow button, the front end registers the button click and then sends a request to the back end. The back end receives the request. It validates and authenticates it. If there are no issues or whatnot, then the like value or count is incremented. The back-end after processing the request, then returns a response. Depending on the state (status) of the response, the front end updates the view to reflect the current changes.

Irrespective of what we have discussed so far, my thoughts on what a backend is may or might be limited to what I know or learnt from others.

Next, we will discuss, **What is an API?**
