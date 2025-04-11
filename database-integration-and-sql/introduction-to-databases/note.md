# Introduction to Databases

Great... If you are hear then we have:

-   discussed some backend jargons
-   learnt some javescript and written some projects
-   created an api and gradually added onto it

At this point what we need is persistency. Also known as a database. In this context, we want to save the user data that we create and we want to also save the expenses that we create and update. For that to occur, there are a couple of ways to do that. These inluded but not limited to:

-   memory (data is clear when server is restart)
-   file (better than memory but becomes inefficient when there are multiple writing to and also creating relations)
-   database (better than file, we can do complex relationships)

## The concept of database

-   **Database**: A database is used to manage (store, retrive, update and delete) the data our applications depends on. Our user data and expenses will be manages using the database.
-   **Tables**: A table is like a sheet from a notebook (data). We will have tables that will represent users and expense. A table has a name. In a table there are colomns and rows.
-   **Colmn**: A column is a property in a given table. Example, for the user we had in the expense api, it had an `id`, `email` and `passeord`. Practically a column is the same a property or field.
-   **Row**: A row in a table represent an instance of a record of the mentioned table. Example, for the user table, each row represents a user record.

    | id                                   | email                | password      |
    | :----------------------------------- | :------------------- | :------------ |
    | c96b08b8-f92f-4e27-8f04-c4f3604907d6 | john@gmail.com       | passwordhash1 |
    | decec694-6d97-4199-8544-f4bbe7ea753b | mark@gmail.com       | passwordhash2 |
    | b58bceeb-4041-4a50-b204-85caa2ad6c20 | whatisthis@gmail.com | passwordhash3 |
