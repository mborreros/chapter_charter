
# Chapter Charter

This is a webapp modeled after a popular reading tracking app, StoryGraph, that is not linked to Amazon's GoodReads. 

The goal of this project was to recreate the base functionality of the current StoryGraph: adding books that are being read by a user and updating their reading progress on those books, and - most notably - offer an expansion on the current Challenges functionality. 

In current state, a user can create challenges in Storygraph for any prompt of their choosing. They can add books to the challenge and share it with other users so that everyone can reach new reading heights together. But there is a big drawback: books have to be manually added by the creator or contributor of a challenge in order for the app to recognize that a book's progress should also contribute to that particualr challenge's progress. 

In Chapter Charter, users are given more freedom with how they choose to challenge themselves as readers. A user can create many types of challenges: duration (books over a period of time), author (books by a selected author), genre (books within a chosen genre), or collection (books within a collection that the user has created). There are endless possibilities of what the reader can do and how they can reach their next reading level!

## Demo

[Interactive Demo](https://chapter-charter-app.onrender.com) availble 

Full Demo (click to view video)

[![Chapter Charter Full Demo](https://i.postimg.cc/B6fYN9Ty/Screen-Shot-2023-01-03-at-11-51-22-AM.png)](https://www.youtube.com/watch?v=WQimyUZ3EEw&t=13s)

Challenge Form Demo (click to view video)

[![Chapter Charter Challenge Form Demo](https://i.postimg.cc/MTyZHQbL/Screen-Shot-2023-01-03-at-11-54-05-AM.png)](https://www.youtube.com/watch?v=DLXRlkkaVC8&t=3s)

Theme/Modes Demo (click to view video)

[![Chapter Charter Theme Demo](https://i.postimg.cc/hP8m6Xkp/Screen-Shot-2023-01-03-at-11-53-16-AM.png)](https://www.youtube.com/watch?v=q2unjd6xqKw)


## Installation

Clone this repository from Github to your computer. 

Ensure you have the up to date version of [Ruby](https://www.ruby-lang.org/en/) availble on your computer. 

This project runs on PostGres SQL, as a result I recommend you download [PostGres SQL](https://www.postgresql.org/download/) application for your computer before running or installing any portion of this project. 

Once you have downloaded the database manager, open the cloned repository in your prefered code editor (I prefer [VSCode](https://code.visualstudio.com/)).

From your code editor open another terminal. One terminal will handle our backend installation and run and one will handle this for the front end. 

For the backend at the top level of the repository's file structure:

```bash
  bundle install // install dependencies
  rails db:migrate:seed // create backend tables, create seed databas
  rails s // to begin the server
```

For the frontend in the client folder repository's file structure:

```bash
  npm install // install dependencies
  npm start // to begin the front end host
```

Once you have done the dependency installation on both the front end and the backend you can run them simultaneously using one command line function:
```bash
  foreman start -f Procfile.dev
```
    
## API
Chapter Charter is a webapp which communicates to a Rails backend. The backend is run on Active Record. 

There are types of backend routes: those triggered by the user from the frontend and those only used by the backend for maintance and further developing the app. 

### Routes used by the Frontend

#### Get a user's account

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of user to fetch |

Returns a record including: id, username, screenname, avatar_img, created_at; user's journeys; user's collections; user's challenges.

This route is used to find a user after session authentication. The user's id is passed to the route from the web browser's session cookies.

#### Create a user account

```http
  POST /api/users/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **required**: unique and more than 5 characters |
| `password` | `string` | **required**: more than 7 characters |
| `screenname` | `string` | **required** |
| `avatar_img` | `string` |  url of an image the user sets as their profile picture |

The password will be encrypted by the Bcrypt gem and be securely stored as a password digest. The new record will be set with a new and unique id. 
Return new user record with id, username, screenname, avatar_img, created_at and their associated journeys, collections, and challenges.

#### Updated a user's account

```http
  PATCH /api/users/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to identify which user record to modify |
| `username` | `string` | **required**: unique and more than 5 characters |
| `screenname` | `string` | **required** |
| `avatar_img` | `string` |  url of an image the user sets as their profile picture |

#### Delete a user's account

```http
  DELETE /api/users/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to specify which user record to delete |

Deletes all associated journeys, challenges, and collections. 

#### Get all collections associated with a user

```http
  GET /api/users/${id}/collections
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of user to fetch |

Returns all collection records associated with the specified user. Each record includes: id, name, description, created_at, challenge_locked, collection's collection entries, and the books that are associated with each collection entry. 

#### Create a collection

```http
  POST /api/collections
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **required** must be at least a character long|
| `description` | `string` | **required** maximum length is 250 characters|
| `user_id` | `integer` | **required** id of user to associate collection with |
| `challenge_locked` | `boolean` | identifies whether a collection is being used in an active challenge, if so this is set to true and the user cannot delete or modify the collection; defaults to false |

Returns new collection record, includes: id, name, description, created_at, challenge_locked, collection's collection entries, and the books that are associated with each collection entry. 

#### Delete a collection

```http
  DELETE /api/collections/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required** passed in route to speicify the collection record to be deleted|

Deletes all associated collection entries.

#### Create a collection entry

```http
  POST /api/collection_entries
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `book_id` | `integer` | **required** id referencing a book in the database|
| `collection_id` | `integer` | **required** id referencing a collection in the database|

The body of the POST request includes two pieces of information, the collection entry data listed above and an array of parsed books that the user selected. Before collection entries can be created, any books that the user selected that are not in the database must be added. This route carries out this process. 

Returns an array of new collection entry records including: id, book_id, collection_id, collection entries's associated collection and book.

A validation runs to ensure that the book a user is creating a collection entry for is unique, if it is a duplicate it will not POST and throw an error.

#### Delete a collection entry

```http
  DELETE /api/collection_entries/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to specify which collection entry record to delete |

#### Get all journeys associated with a user

```http
  GET /api/users/${id}/journeys
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of user to fetch |

Returns all journey records associated with the specified user. Each record includes: id, start_date, end_date, current_progress, manually_completed, completed, and the books and journey entries that are associated with each journey. 

Current_progress is calculated by the serializer to display based on the journey entrie's associated with the journey record, what the overall progress on that journey is. 
Manually_completed is not used within this web app, but is a feature that will be developed on in the future of this app's developement - allowing a user to submit books that they are already completed in order to wholistically document their reading experience.


#### Create a journey

```http
  POST /api/journeys
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `book_id` | `string` | **required** id of the book associated with the journey|
| `user_id` | `string` | **required** id of the user associated with the journey|
| `start_date` | `string` | **required** start date in "YYYY-MM-DD" format |
| `end_date` | `string` | end date in "YYYY-MM-DD" format  |
| `manually_completed` | `boolean` | has this book already been completed by the user, i.e. is it a historical or current record |
| `completed` | `boolean` | has this book been completed by the user, i.e. is there an associated journey entry record with progress 100%, defaults to false |

The body of the POST request includes two pieces of information, the journey data listed above and a parsed book that the user selected. Before a journey can be created, if the book that the user selected is not in the database it must be added. This route carries out this process. 

Returns a new journey record including: id, start_date, end_date, current_progress, manually_completed, completed, and the books and journey entries that are associated with each journey.  

A validation runs on creation of a new journey record which checks to see if the specified user already has another journey open with a book of the same id. If a record is found, the journey will not be created and an error will be thrown. 

#### Delete a journey

```http
  DELETE /api/journeys/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to specify which journey record to delete |

Deletes all associated journey entries.

#### Create a journey entry

```http
  POST /api/journey_entries
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `journey_id` | `integer` | **required** id of journey that this new entry is associated with|
| `date` | `string` | **required** in format "YYYY-MM-DD"|
| `progress` | `integer` | **required** number between 1-100 designating the % completion of the journey|

Returns a new journey entry including: id, date, progress, created_at, and the associated journey, book, and user record. 

If the journey entry's progress is 100, the associated journey will be found and the completed attribute will be updated to true. 

A validation is run on creation of a new journey entry to ensure that all journey entries have progress that is greater than the previously created journey entries. If the progress is not greater than the previous, the record will not be created and an error will be thrown. 

Two methods are run after journey entry creation if the record created has progress 100 (signifying the completetion of a book). These methods first see if this user has any active challenges. If the user does have active challenges, a method is run which checks through the details of each challenge to see if the journey that the user is completing by creating the journey entry will count towards the progress of any of the active challenges. If the journey entry will, then a corresponding challenge entry is created associated with the new journey entry. If there is any error throughout this process, an error will be thrown. 


#### Delete a journey entry

```http
  DELETE /api/journey_entries/${id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **required** passed in the route to specify the journey entry record to show|

#### Get all challenges associated with a user

```http
  GET /api/users/${id}/challenges
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of user to fetch |

Returns all challenge records associated with the specified user including: id, name, description, start_date, end_date, goal_number, goal_type, category, category_identifier, challenge_progress, active, successful, and the books associated with the challenge record.

Challenge_progress is a calculated value run by the serializer. Based on the number of challenge entries associated with the challenge and the challenge's goal_number, a percentage is calculated and shown with the record. 

#### Create a challenge

```http
  POST /api/challenges
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **required** |
| `description` | `string` |  |
| `start_date` | `string` | **required** formatted "YYYY-MM-DD"|
| `end_date` | `string` | formatted "YYYY-MM-DD" |
| `user_id` | `integer` | **required** id of the user associated with this new challenge|
| `goal_number` | `integer` | **required** number of books |
| `goal_type` | `string` | **required** either "duration" or "interest" |
| `category` | `string` | (if goal_type is "interest") **required**: either "author", "genre", "collection_id" |
| `category_identifier` | `string` | (if goal_type is "interest") **required**: depending on what the category is this will be the name of an author from OpenLibrary Books API, a genre typed by the user, or the id of one of the user's collections|
| `active` | `boolean` | if the start date is today, will be set to true; if the start date is in the future, will be set to false |
| `successful` | `boolean` | sets to true or false once the end_date is reach and/or the challenge goal_number of book journey completions have been created |

 Returns a new challenge record including: id, name, description, start_date, end_date, goal_number, goal_type, category, category_identifier, challenge_progress, active, successful, and the books associated with the challenge record.

 A validation runs on create to ensure that the necessary information relating to category and category_identifier have been submitted with the record if the goal_type is "interest". If the validation fails, an error will be thrown. 
 
 If the challenge created is associated with a collection, the collection will be marked as challenge_locked is true to prevent the user from modifying it while the challenge is active. 


#### Delete a challenge

```http
  DELETE /api/challenges/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to specify which challenge record to delete |

Deletes all associated challenge entries. 

### Routes on the Backend for further Development

#### Get all user accounts

```http
  GET /api/users
```
Each record includes: id, username, screenname, avatar_img, created_at.

#### Get all books

```http
  GET /api/books
```
Each record includes: id, title, author, length (page length), genre, cover_img, book_api_num.

#### Get a book

```http
  GET /api/books/${id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of book to fetch |

Returns a record including: id, title, author, length (page length), genre, cover_img, book_api_num.

#### Create a book

```http
  POST /api/books
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **required** |
| `author` | `string` | **required**: |
| `length` | `integer` | page count |
| `genre` | `array of strings` | accomodates a book having multiple genres |
| `cover_img` | `string` | url pointing to book's cover image |
| `book_api_num` | `string` | **required**: a unique series of numbers and letters which is used by the OpenLibrary API to find a book directly (e.g. Twilight by Stephanie Meyer is OL5720023W) |

This method is called from other routes across the database, but is never directly requested by the frontend user. 

The data that is passed in the body of this POST request on the front end always occurs after a book has been fetched from the OpenLibrary API. The user is not inputting any of this information manually, it is all copied over from the API.

#### Delete a book

```http
  DELETE /api/books/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to specify which book record to delete |

#### Get all collections

```http
  GET /api/collections
```
Returns all collection records including: id, name, description, created_at, challenge_locked, collection's collection entries, and the books that are associated with each collection entry. 

#### Get a collection

```http
  GET /api/collections/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to specify which collection record to view |

Returns a collection record including: id, name, description, created_at, challenge_locked, collection's collection entries, and the books that are associated with each collection entry.

#### Update a collection

```http
  PATCH /api/collections/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required** passed in route to specify which collection record to modify|
| `name` | `string` | **required** must be at least a character long|
| `description` | `string` | **required** maximum length is 250 characters|
| `challenge_locked` | `boolean` | identifies whether a collection is being used in an active challenge, if so this is set to true and the user cannot delete or modify the collection; defaults to false |

This is use used in on the front end after a challenge is created or deleted to update challange_locked attribute on the record, indicating whether the user can manipulate that collection or not. 

Returns the updated collection record, including: id, name, description, created_at, challenge_locked, collection's collection entries, and the books that are associated with each collection entry. 

#### Get all collection entries

```http
  GET /api/collection_entries
```

Returns all collection entry records, each including: id, book_id, collection_id, collection entries's associated collection and book.

#### Get a collection entry

```http
  GET /api/collection_entries/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required**: passed within the route to specify which collection entry record to view |

Returns a collection entry record including: id, book_id, collection_id, collection entries's associated collection and book.

#### Update a collection entry

```http
  PATCH /api/collection_entries/${}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | **required** id referencing the collection entry to be modified|
| `book_id` | `integer` | **required** id referencing a book in the database|
| `collection_id` | `integer` | **required** id referencing a collection in the database|

Returns an updated collection entry records including: id, book_id, collection_id, collection entries's associated collection and book.

A validation runs to ensure that the book a user is creating a collection entry for is unique, if it is a duplicate it will not POST and throw an error.


#### Get all journeys

```http
  GET /api/journeys
```

Returns all journey records including: id, start_date, end_date, current_progress, manually_completed, completed, and the books and journey entries that are associated with each journey. 

Current_progress is calculated by the serializer to display based on the journey entrie's associated with the journey record, what the overall progress on that journey is. 
Manually_completed is not used within this web app, but is a feature that will be developed on in the future of this app's developement - allowing a user to submit books that they are already completed in order to wholistically document their reading experience.


#### Get a journey

```http
  GET /api/journeys/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of journey to fetch |

Returns a journey records associated including: id, start_date, end_date, current_progress, manually_completed, completed, and the books and journey entries that are associated with each journey. 

Current_progress is calculated by the serializer to display based on the journey entrie's associated with the journey record, what the overall progress on that journey is. 
Manually_completed is not used within this web app, but is a feature that will be developed on in the future of this app's developement - allowing a user to submit books that they are already completed in order to wholistically document their reading experience.

#### Updated a journey

```http
  PATCH /api/journeys
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `book_id` | `string` | **required** id of the book associated with the journey|
| `user_id` | `string` | **required** id of the user associated with the journey|
| `start_date` | `string` | **required** start date in "YYYY-MM-DD" format |
| `end_date` | `string` | end date in "YYYY-MM-DD" format  |
| `manually_completed` | `boolean` | has this book already been completed by the user, i.e. is it a historical or current record |
| `completed` | `boolean` | has this book been completed by the user, i.e. is there an associated journey entry record with progress 100% |

Returns a journey record associated including: id, start_date, end_date, current_progress, manually_completed, completed, and the books and journey entries that are associated with each journey. 


#### Get all journey entries

```http
  GET /api/journey_entries
```

Returns all journey entries including: id, date, progress, created_at, and the associated journey, book, and user record. 

#### Get a journey entry

```http
  GET /api/journey_entries/${id}
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **required** passed in the route to specify the journey entry record to show|

Returns a journey entry including: id, date, progress, created_at, and the associated journey, book, and user record. 

#### Update a journey entry

```http
  PATCH /api/journey_entries
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `journey_id` | `integer` | **required** id of journey that this new entry is associated with|
| `date` | `string` | **required** in format "YYYY-MM-DD"|
| `progress` | `integer` | **required** number between 1-100 designating the % completion of the journey|

Returns an updated journey entry including: id, date, progress, created_at, and the associated journey, book, and user record. 

The validations for forward progress and methods to check if the journey entry if of progress 100% or applies to any active challenges will not run. 

#### Get all challenges 

```http
  GET /api/challenges
```

Returns all challenge records including: id, name, description, start_date, end_date, goal_number, goal_type, category, category_identifier, challenge_progress, active, successful, and the books associated with the challenge record.

Challenge_progress is a calculated value run by the serializer. Based on the number of challenge entries associated with the challenge and the challenge's goal_number, a percentage is calculated and shown with the record. 

#### Get a challenge

```http
  GET /api/challenges/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of challenge to fetch |

Returns a challenge record including: id, name, description, start_date, end_date, goal_number, goal_type, category, category_identifier, challenge_progress, active, successful, and the books associated with the challenge record.

Challenge_progress is a calculated value run by the serializer. Based on the number of challenge entries associated with the challenge and the challenge's goal_number, a percentage is calculated and shown with the record. 


#### Update a challenge

```http
  PATCH /api/challenges
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **required** |
| `description` | `string` |  |
| `start_date` | `string` | **required** formatted "YYYY-MM-DD"|
| `end_date` | `string` | formatted "YYYY-MM-DD" |
| `user_id` | `integer` | **required** id of the user associated with this new challenge|
| `goal_number` | `integer` | **required** number of books |
| `goal_type` | `string` | **required** either "duration" or "interest" |
| `category` | `string` | (if goal_type is "interest") **required**: either "author", "genre", "collection_id" |
| `category_identifier` | `string` | (if goal_type is "interest") **required**: depending on what the category is this will be the name of an author from OpenLibrary Books API, a genre typed by the user, or the id of one of the user's collections|
| `active` | `boolean` | if the start date is today, will be set to true; if the start date is in the future, will be set to false |
| `successful` | `boolean` | sets to true or false once the end_date is reach and/or the challenge goal_number of book journey completions have been created |

 Returns an updated challenge record including: id, name, description, start_date, end_date, goal_number, goal_type, category, category_identifier, challenge_progress, active, successful, and the books associated with the challenge record.

 If the challenge created is associated with a collection, the collection will be marked as challenge_locked is true to prevent the user from modifying it while the challenge is active. 
 
 Note: the validation which runs on create to ensure that the necessary information relating to category and category_identifier have been submitted with the record if the goal_type is "interest" will not run when the record is updated. 
 

#### Get all challenge entries

```http
  GET /api/challenge_entries
```

Returns all challenge entry records including: id and the challenge, books, and journey entry associated with the challenge entry record.

#### Get a challenge entry

```http
  GET /api/challenge_entries/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of challenge entry to fetch |

Returns a challenge entry record including: id and the challenge, books, and journey entry associated with the challenge entry record.

#### Create a challenge entry

```http
  POST /api/challenge_entries/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `book_id` | `integer` | **required**: id of the book associated with this challenge entry |
| `journey_id` | `integer` | **required**: id of the journey that created with this challenge entry|
| `challenge_id` | `integer` | **required**: id of the challenge associated with this challenge entry |

Returns a new challenge entry record including: id and the challenge, books, and journey entry associated with the challenge entry record.

On create, a validation is run to ensure that each new challenge entry record has a unique book associated with it. If the book is not unique, an error will be thrown. 

A method is run after create which checks to see the goal_number of the associated challenge and how many challenge entries the challenge has. If the number of entries associated with the challenge is equal to the goal_number, the challenge is marked as active is false and successful is true. 

#### Update a challenge entry

```http
  PATCH /api/challenge_entries/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `book_id` | `integer` | **required**: id of the book associated with this challenge entry |
| `journey_id` | `integer` | **required**: id of the journey that created with this challenge entry|
| `challenge_id` | `integer` | **required**: id of the challenge associated with this challenge entry |

Returns an updated challenge entry record including: id and the challenge, books, and journey entry associated with the challenge entry record.

Note: validation to ensure that no duplicate challenge entries with the same book are created will not run on update. The method to check if the challenge has been completed based on the challenge entries and goal_number will not run or update the challenge to be inactive on completion. 

#### Deleted a challenge entry

```http
  DELETED /api/challenge_entries/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `integer` | id of challenge entry to delete |


![Standard Logo](https://i.postimg.cc/fyC11yTF/chapter-charter-logo.png)
![Dark Theme Logo](https://i.postimg.cc/FRg6JzcR/logo-light.png)
![Full Logo with image](https://i.postimg.cc/g2CtS8Hj/logo-image.png)
![Favicon](https://i.postimg.cc/RZHXHqxB/book.png)


## Acknowledgements

 - [The Storygraph - for reigniting my love for reading](https://www.thestorygraph.com/)
 - [OpenLibrary Books API](https://openlibrary.org/dev/docs/api/books)
 - [Bootstrap for React](https://github.com/matiassingers/awesome-readme)
 - [Metronic Theme](https://keenthemes.com/metronic)
 - [FontAwesom Icons](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
 - [React Select - specifically Async Select](https://react-select.com/async)
 - [Google Charts](https://developers.google.com/chart)
 - [Whenever gem for scheduled Cron tasks](https://github.com/javan/whenever)
 - [moment gem for formating dates](https://momentjs.com/)
 - [Canva - for graphics generators](https://www.canva.com/create/logos/)
 - [Lorem Ipsum Image - for seed data stock imagery](https://picsum.photos/)
 - [Flatiron Academy](https://flatironschool.com/welcome-to-flatiron-school/?utm_source=Google&utm_medium=ppc&utm_campaign=12728169833&utm_content=127574232664&utm_term=flatiron%20academy&uqaid=513747011248&Cj0KCQiAnsqdBhCGARIsAAyjYjTDWuCPjplszXr00lPCCtviILk_1I4yZj76DQToDRgjyVLZ9cj_pYsaAlF6EALw_wcB&gclid=Cj0KCQiAnsqdBhCGARIsAAyjYjTDWuCPjplszXr00lPCCtviILk_1I4yZj76DQToDRgjyVLZ9cj_pYsaAlF6EALw_wcB)


## Additional Feature Plans

- ~~sorting of journeys/challenges/collections~~ (added 1/10/2023)
- click of dashboard charts leads users to that specific view on the respective card/detail page
- users can review books and organize by reviews
- graphs showing user reviews
- users can recommend a book to one another


## Feedback

If you have any feedback, please don't hesitate to reach out to me by email at maya.borrero@outlook.com. 

I appreciate your interest in time in advance!


## Process & Planning
Brainstorming the data structures and each of the client views prior to beginning this project was incredibly helpful in remaining on track and focus on a specific desired outcome. I attribute a lot of my ability to accomplish this all quickly to my planning process. 

Here are some images to give you a feel for what that process looks like. You can really see how much my initial thoughts came to life through this app. 

![Views Planning 1 of 3](https://i.postimg.cc/MTvBctrG/Screen-Shot-2023-01-03-at-11-58-47-AM.png)


![Views Planning 2 of 3](https://i.postimg.cc/4ypmt0vX/Screen-Shot-2023-01-03-at-11-59-14-AM.png)


![Views Planning 3 of 3](https://i.postimg.cc/dtB0Yr4N/Screen-Shot-2023-01-03-at-11-59-36-AM.png)


![Data Structure Planning 1 of 2](https://i.postimg.cc/HWtmcHXV/Screen-Shot-2023-01-03-at-12-00-31-PM.png)


![Data Structure Planning 2 of 2](https://i.postimg.cc/52XWRCGC/Screen-Shot-2023-01-03-at-12-00-46-PM.png)




## Authors

- Maya Borrero [@mborreros](https://github.com/mborreros)

