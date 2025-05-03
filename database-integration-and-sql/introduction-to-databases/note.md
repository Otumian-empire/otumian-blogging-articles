# Introduction to Databases

Great... If you are here then we have:

-   discussed some backend jargon
-   learnt some JavaScript and wrote some projects
-   created an api and gradually added to it

At this point what we need is persistence. Also known as storage. The means of storage that we want, in this case, is a database. We want to save the user data that we create and we want to also save the expenses that we create and update. For that to occur, there are a couple of ways to do that. These include but are not limited to:

-   **Memory**: The data is assigned to a (global) variable and manipulated to achieve our storage goal. However, it is that the data stored in memory are cleared when the server restarts. We will face what is termed as Data loss. If you have heard of the phrase, "Time is money" then here, "Data is business".
-   **File**: Saving (writing) data into a file is quite better than in-memory. The content of the file isn't lost when the server restarts. However, that storage and its management via file becomes inefficient when there are multiple write operations. This means that when we have several users, not that the users are accessing the same data but they are managing their data, simultaneously, then the is a case of we facing data loss due to simultaneously writing to the same file. Can't we use several files (with a schema - structure)? There is an issue with creating relations. We want to map or associate some set of data with another. With file, as a means of persistence, this may become inefficient.
-   **Database**: A database is better than a file. We can create and manage complex relationships.

## Database Concepts

-   **Database**: A database is used to organize and manage (store, retrieve, update and delete) the data our applications depend on. A database can be seen (imagined) as a folder or a book. Our application will use a database to organize (in a well-structured manner) our users' data and expenses. We can create a simple relationship between a user and an expense.
-   **Tables**: A table is a (structured) collection of data organized in rows (values) and columns (keys/properties/fields). If a database is a book, each table is like a chapter or page containing related information.. If a database is a folder, a table will be a file. We will have tables that will represent users and expenses. A table has a name. In a table, there are rows and columns.
-   **Column**: A column is (or represents) a property/key/field in a given table. For example, for the user we had in the _expense api_, it had an `id`, `email` and `password` properties. These become columns in a table. Practically a column is the same as a property or field.
-   **Row**: A row in a table represents an instance of a record of the said table, having values that map to the columns they fall under. For example, for the _user_ table, each row represents a "user" record.

    | id                                   | email                | password      |
    | :----------------------------------- | :------------------- | :------------ |
    | c96b08b8-f92f-4e27-8f04-c4f3604907d6 | john@gmail.com       | passwordhash1 |
    | decec694-6d97-4199-8544-f4bbe7ea753b | mark@gmail.com       | passwordhash2 |
    | b58bceeb-4041-4a50-b204-85caa2ad6c20 | whatisthis@gmail.com | passwordhash3 |

-   **Primary**: In a database, there is a column which is used to uniquely identify a row. This column or columns are referred to as a **primary key**.
-   **Relational Database**: This is a database that is designed to favour creating and manipulating data with relations in mind. Examples of these are, but not limited to _PostgreSQL_, _MySQL_, _SQLite_, etc (etc is not a database). We might end up using _SQLite_ and _PostgreSQL_. These databases favour or are defined using rows as records and columns as properties.
-   **Document Database**: Also known as **No-SQL** database, is a database designed with data format flexibility in mind. The data format is non-structured unlike in a relational database, for which it is called a **No-SQL** database. Practically, it more or less semi-structured. Examples of these are but are not limited to _MongoDB_, _Redis_, _CouchDB_, _Cassandra_, etc. We might end up using _MongoDB_ and _Redis_.

## SQL

**SQL** stands for _Structure Query Language_. It is the language of **Relational databases**. We will start with _SQLlite_ and whatever we would learn here is "transferable". So, do not stress and enjoy the journey. You would want to check out this article, [7-best-sql-books-for-beginners-54gi](https://dev.to/bobbyiliev/7-best-sql-books-for-beginners-54gi). There are some great books and resources. Check them out and finally, there is [Beekeeper Studio](https://www.beekeeperstudio.io/), a database client. We will use it to view and sometimes manage and interact with the databases we create. There is a community edition so read the docs and install whatever version of the applications you want.

In the next section, we are going to create a cheat sheet that we can reference when we are developing. Hold on tight.
