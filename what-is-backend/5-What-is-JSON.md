# What is JSON

**JSON** stands for JavaScript Object Notation. This is a format for data presentation and communication between machines. **JSON** is human-readable. Humans can read it and create it. A **JSON** file has the `.json` extension. This is a very simple example of a **JSON** file - `package.json` for a *nodejs* application.

```json
{
  "name": "demo-backend-app",
  "version": "1.0.0",
  "description": "Demo Nodejs Backend Application",
  "main": "src/index.js",
  "scripts": {
    "dev": "nodemon",
    "start": "node src/index.js",
    "format": "npx prettier --write ./src",
  },
  "engines": {
    "node": ">=14.15.0 <=14.21.2 || >=16.13.0 <=16.19.0 || 18.12.0 || >=18.12.1 "
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Otumian-empire/demo-backend-app.git"
  },
  "keywords": [
    "demo",
    "nodejs",
    "api",
    "backend",
    "otumianempire",
    "☺️"
  ],
  "author": "https://github.com/Otumian-empire",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/Otumian-empire/demo-backend-app/issues"
  },
  "homepage": "https://github.com/Otumian-empire/demo-backend-app#readme",
  "dependencies": {
    "express": "^4.18.1",
    "joi": "^17.6.3"
  },
  "devDependencies": {
    "dotenv": "^16.0.2",
    "eslint": "^8.22.0",
    "nodemon": "^2.0.19",
    "prettier": "2.7.1"
  }
}
```

**JSON** is based on two structures: an object (collection *key-value* pair) and an array (list of values). In the object, the key is always a string.

Some of the keys in the above **JSON** file: are `name`, `version`, `main`, and `script` for an instance. These keys point to a value. There are arrays, such as the value for keywords and the rest are objects and strings.

### Uses of JSON

- Data interchange - a server and a client will communicate (send and receive data) from each other in **JSON**.
- Configurations file: Most configuration files are in **JSON** format. Some of these are included but not limited to: `package.json,` `tsconfig.json,` `cspell.json,` `postman-collection.json,` and `.prettierrc.json`.
- Data storage - We can write data into files. For more or some structure, we can use **JSON** files to store the data. We can have the **JSON** and assign some part for some specific field to hold some data.

### Pros: Relation to API development

- It is easy for humans to read and interpret and even add to.
- It is lightweight in terms of payload size. **JSON** doesn't use schemas, so the payload size becomes less.
- It is language agnostic - **JSON** is not for just JavaScript. It can be used by any language since almost all these languages support **JSON** out of the box.
- It is flexible - which means it doesn't necessarily have a structure. One can structure it as one sees fit. Just don’t get carried away. You work with humans.

### Cons:

- We can not add comments in **JSON** because comments are not permitted. So if there is a reason something, a key, was added, document it.
- The supported data types are limited. This doesn’t mean you can not combine any of them to create complex structures.
- As the content of a **JSON** file grows, it could make the API request slow. The payload size will increase. This is related to **JSON** being lightweight - as mentioned in the *Pros*.
- **JSON** doesn't support binary data, it is text-based. So we can not upload images or attachments as part of the request.
- The deeper data is nested, the uglier it becomes, literally. It becomes hard to read. So deep nesting.
- **JSON** doesn't do self-validation. It won’t naturally tell you something is wrong or you missed a comma or a quote. Some parser or validation tool would needed for that. In `vscode` and some smart editors, you would to know if there was an issue with your **JSON.**

### Data types

As mentioned earlier, some of the draw backs of using **JSON** is that it has limited data types. Frankly, I think they are enough for all that we will do or need. We can construct any complex type that we need. The types supported are:

- boolean: `true`, `false`,
- string: `"John doe"`, `"api"`
- number: `0`, `12`, `12.0`, `3.1243`
- null: `null`,
- objects: `{ "key": "value" }` - this is like a mini-json
- array: `[1,2]`, `["hello", "hi"]`, `[true, false]`

### Sample **JSON** data

- This one has the name of a person and their data of birth
    
    ```json
    {
      "name": "John Does",
      "dateOfBirth": "23rd December, 2023"
    }
    ```
    
- This one returns a user data, a token and a date
    
    ```json
    {
      "user": {
    		"name": "John Does",
    	  "dateOfBirth": "23rd December, 2023"
    	},
      "token": "PTqjFwdqQb8unXE6nvW2svgyQuM9DgkAALAECDCjEFCUXtFasSgf2Kmtu5J7u5rw",
      "createdAt": "2024-03-08 12:04:14 UTC"
    }
    ```
    
- This is a list of some super heroes, their id and name.
    
    ```json
    [
      {
    		"id": 0,
    		"name": "Brendan Eich",
    	},
    	{
        "id": 1,
        "name": "Dennis Ritchie"
      },
      {
        "id": 2,
        "name": "Donald Knuth"
      },
      {
        "id": 3,
        "name": "Bjarne Stroustrup"
      },
      {
        "id": 4,
        "name": "Martin Stepp"
      },
      {
        "id": 5,
        "name": "Joe Rogan"
      },
      {
        "id": 6,
        "name": "Ken Thompson"
      },
      {
        "id": 7,
        "name": "Guido van Rossum"
      },
    	{
    		"id": 8,
    		"name": "Jerry Cain"
    	},
    	{
    		"id": 9,
    		"name": "David Malan"
    	},
    	{
    		"id": 10,
    		"name": "Dan Abramov"
    	},
    	{
    		"id": 11,
    		"name": "TJ Holowaychuk"
    	},
    	{
    		"id": 12,
    		"name": "Feross Aboukhadijeh"
    	},
    	{
    		"id": 13,
    		"name": "Matt DesLauriers"
    	},
    	{
    		"id": 14,
    		"name": "Jake Wharton"
    	}
    ]
    ```
    
    ### Resources
    
- Check out [[json.org](](https://www.json.org/)[https://www.json.org/json-en.html](https://www.json.org/json-en.html)) to read more on **JSON.**
- JSON doesn't support binary data, it is text-based. So we can not upload images or attachments as part of the request. As such we would have to change the content type. One of my mates argued that we can simply base64-encode the binary data and send it to wherever it is needed then that endpoint will base64-decode it to the binary. And he was right. There is an issue with this approach though. This issue isn’t one that will break the “JSON” but it will bloat it, fatten. Meaning that payload size will increase thereby slowing the API. What do you think are some other issue that may arise by encoding and decoding binary data? You may share your thoughts on encoding binary data in JSON.