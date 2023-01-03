puts "Seeding book test data 📔"
  Book.create!(title: "Test Title 1", author: "Test Author 1", length: 100, genre: ["test genre 1"], cover_img: "https://picsum.photos/200/300", book_api_num: 1)
  Book.create!(title: "Test Title 2", author: "Test Author 2", length: 200, genre: ["test genre 2"], cover_img: "https://picsum.photos/200/300", book_api_num: 2)
  Book.create!(title: "Test Title 3", author: "Test Author 3", length: 300, genre: ["test genre 3"], cover_img: "https://picsum.photos/200/300", book_api_num: 3)
  Book.create!(title: "Test Title 4", author: "Test Author 4", length: 400, genre: ["test genre 4"], cover_img: "https://picsum.photos/200/300", book_api_num: 4)
  Book.create!(title: "Test Title 5", author: "Test Author 5", length: 500, genre: ["test genre 5"], cover_img: "https://picsum.photos/200/300", book_api_num: 5)
puts "Finished seeding book test data 📔✨"

puts "Seeding user test data 👤"
  User.create!(username: "adam_user_test", password: "password", password_digest: BCrypt::Password.create("password"), screenname: "Adam", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "beth_user_test", password: "password", password_digest: BCrypt::Password.create("password"), screenname: "Beth", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "cleo_user_test", password: "password", password_digest: BCrypt::Password.create("password"), screenname: "Cleo", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "david_user_test", password: "password", password_digest: BCrypt::Password.create("password"), screenname: "David", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "elaine_user_test", password: "password", password_digest: BCrypt::Password.create("password"), screenname: "Elaine", avatar_img: "https://picsum.photos/200/300?blur=2")
puts "Finished seeding user test data 👤✨"

puts "Seeding collection test data 📚"
user_ids = User.all.ids
  Collection.create!(name: "Collection 1", description: "test description of collection 1", user_id: 1)
  Collection.create!(name: "Collection 2", description: "test description of collection 2", user_id: 3)
  Collection.create!(name: "Collection 3", description: "test description of collection 3", user_id: 5)
puts "Finished seeding collection test data 📚✨"

puts "Seeding collection entries test data 📋"
book_ids = Book.all.ids
collection_ids = Collection.all.ids
two_random_books_for_collection = book_ids.sample(2)
another_two_random_books_for_collection = book_ids.sample(2)
  CollectionEntry.create!(collection_id: 1, book_id: two_random_books_for_collection[0])
  CollectionEntry.create!(collection_id: 1, book_id: two_random_books_for_collection[1])
  CollectionEntry.create!(collection_id: 2, book_id: book_ids.sample)
  CollectionEntry.create!(collection_id: 3, book_id: another_two_random_books_for_collection[0])
  CollectionEntry.create!(collection_id: 3, book_id: another_two_random_books_for_collection[1])
puts "Finished seeding collection entries test data 📋✨"

puts "Seeding journey test data 🌐"
random_date = Date.new(2022, 9, 27)
completion_date = random_date.next_month
  # creating active journeys
  Journey.create!(book_id: 1, user_id: 1, start_date: Date.new(2022, 10, 01).to_fs(:db), end_date: nil, manually_completed: false)
  Journey.create!(book_id: 2, user_id: 2, start_date: Date.new(2022, 10, 30).to_fs(:db), end_date: nil, manually_completed: false)
  Journey.create!(book_id: 3, user_id: 3, start_date: Date.new(2022, 11, 01).to_fs(:db), end_date: nil, manually_completed: false)
  Journey.create!(book_id: 4, user_id: 5, start_date: Date.new(2022, 10, 01).to_fs(:db), end_date: nil, manually_completed: false)
puts "Finished journey test data 🌐✨"

puts "Seeding challenge test data 🧩"
  # read 5 books within a month active
  Challenge.create!(name: "Challenge 1", description: "read 5 books within a month active", start_date: Date.new(2022, 11, 15).to_fs(:db), end_date: Date.new(2022, 12, 15).to_fs(:db), user_id: 1, goal_number: 5, goal_type: "duration", category: nil, category_identifier: nil, active: true, successful: nil)

  # read 5 books within a month inactive
  Challenge.create!(name: "Challenge 2", description: "read 5 books within a month inactive", start_date: Date.new(2022, 10, 15).to_fs(:db), end_date: Date.new(2022, 11, 15).to_fs(:db), user_id: 2, goal_number: 5, goal_type: "duration", category: nil, category_identifier: nil, active: false, successful: nil)

  # read 3 books by an author with no end date active
  Challenge.create!(name: "Challenge 3", description: "read 3 books by an author with no end date active", start_date: Date.new(2022, 9, 30).to_fs(:db), end_date: nil, user_id: 1, goal_number: 3, goal_type: "interest", category: "author", category_identifier: "Test Author 1", active: true, successful: nil)

  # read 2 books by an author with endate inactive
  Challenge.create!(name: "Challenge 4", description: "read 2 books by an author with endate inactive", start_date: Date.new(2022, 9, 30).to_fs(:db), end_date: Date.new(2022, 9, 30).to_fs(:db), user_id: 5, goal_number: 2, goal_type: "interest", category: "author", category_identifier: "Test Author 3", active: false, successful: nil)

  # read 10 books within a particular genre with end date active
  Challenge.create!(name: "Challenge 5", description: "read 10 books within a particular genre with end date active", start_date: Date.new(2022, 8, 1).to_fs(:db), end_date: Date.new(2022, 12, 31).to_fs(:db), user_id: 1, goal_number: 10, goal_type: "interest", category: "genre", category_identifier: "test genre 4", active: true, successful: nil)

  # read 4 books within a particular genre with end date inactive
  Challenge.create!(name: "Challenge 6", description: "read 4 books within a particular genre with end date inactive", start_date: Date.new(2022, 8, 1).to_fs(:db), end_date: Date.new(2022, 11, 1).to_fs(:db), user_id: 4, goal_number: 4, goal_type: "interest", category: "genre", category_identifier: "test genre 3", active: false, successful: nil)

  # read 2 books from a particular collection without end date active
  Challenge.create!(name: "Challenge 7", description: "read 2 books from a particular collection without end date active", start_date: Date.new(2022, 10, 5).to_fs(:db), end_date: nil, user_id: 1, goal_number: 4, goal_type: "interest", category: "collection_id", category_identifier: "2", active: true, successful: nil)

  # read 2 books from a particular collection with end date inactive
  Challenge.create!(name: "Challenge 8", description: "read 2 books from a particular collection with end date inactive", start_date: Date.new(2022, 10, 5).to_fs(:db), end_date: Date.new(2022, 11, 1).to_fs(:db), user_id: 5, goal_number: 2, goal_type: "interest", category: "collection_id", category_identifier: "3", active: false, successful: nil)

puts "Finished challenge test data 🧩✨"

puts "Seeding journey entry test data 📍"
  # creating journey entries with progress >100
  JourneyEntry.create!(journey_id: 1, date: Date.new(2022, 10, 3).to_fs(:db), progress: 10)
  JourneyEntry.create!(journey_id: 1, date: Date.new(2022, 10, 4).to_fs(:db), progress: 25)
  JourneyEntry.create!(journey_id: 2, date: Date.new(2022, 11, 2).to_fs(:db), progress: 30)
  JourneyEntry.create!(journey_id: 3, date: Date.new(2022, 11, 5).to_fs(:db), progress: 40)
  JourneyEntry.create!(journey_id: 3, date: Date.new(2022, 11, 5).to_fs(:db), progress: 50)
  JourneyEntry.create!(journey_id: 4, date: Date.new(2022, 11, 5).to_fs(:db), progress: 75)
  # creating journey entries with progress=100 
  JourneyEntry.create!(journey_id: 3, date: Date.new(2022, 11, 21).to_fs(:db), progress: 100)
  JourneyEntry.create!(journey_id: 4, date: Date.new(2022, 11, 8).to_fs(:db), progress: 100)
puts "Finished journey entry test data 📍✨"

puts "Seeding admin account for demo 💅🏻"

# create admin user
User.create!(username: "maya_admin", password: "maya_admin", password_digest: BCrypt::Password.create("maya_admin"), screenname: "Maya", avatar_img: "https://picsum.photos/200/300?blur=2")

# add 5 books
Book.create!(
  title: "Cleopatra and Frankenstein", 
  author: "Coco Mellors", 
  length: 370, 
  genre: [
    "romance",
    "relationships"
  ], 
  cover_img: "https://covers.openlibrary.org/b/id/12888169-S.jpg", 
  book_api_num: "OL25345096W"
)

Book.create!(
  title: "One Flew Over the Cuckoo's Nest", 
  author: "Ken Kesey",
  length: 311, 
  genre: [
    "Allegories",
    "psychiatric nursing",
    "medical novels",
    "Belletristische Darstellung",
    "Psychiatrische Klinik",
    "Fiction",
    "Psychiatric nurses in fiction",
    "Psychiatric hospital patients in fiction",
    "Psychiatric hospital patients",
    "Psychiatric nurses",
    "Mentally ill",
    "Mentally ill in fiction",
    "Psychiatric hospitals",
    "Oregon in fiction",
    "Psychiatric hospitals in fiction",
    "Classic Literature",
    "psychological fiction",
    "satire",
    "Psychiatric hospital patients -- Fiction",
    "Psychiatric hospitals -- Fiction",
    "Psychiatric nurses -- Fiction",
    "Mentally ill -- Fiction",
    "Oregon -- Fiction",
    "Fiction, psychological",
    "American fiction (fictional works by one author)",
    "Large type books",
    "Roman américain",
    "American literature",
    "Friendship",
    "Interpersonal relations",
    "FICTION",
    "Literary",
    "Classics",
    "Psychological",
    "Kesey, ken, 1935-2001",
    "Criticism and interpretation",
    "Minorities in literature",
    "One flew over the cuckoo's nest (Kesey, Ken)"
  ], 
  cover_img: "https://covers.openlibrary.org/b/id/9272688-S.jpg", 
  book_api_num: "OL2944469W"
)

Book.create!(
  title: "Severance", 
  author: "Ling Ma", 
  length: 304, 
  genre: [
    "Fiction, dystopian",
    "New york (n.y.), fiction",
    "Fiction, satire",
    "Fiction",
    "Literature",
    "Science Fiction"
  ], 
  cover_img: "https://covers.openlibrary.org/b/id/10088754-S.jpg", 
  book_api_num: "OL20794410W"
)

Book.create!(
  title: "Vladimir", 
  author: "Julia May Jonas",
  length: 256, 
  genre: [
    "Married people",
    "Fiction",
    "Open marriage",
    "College teachers",
    "Sexual harassment",
    "College students",
    "Man-woman relationships",
    "FICTION / Literary",
    "FICTION / Family Life / Marriage & Divorce",
    "FICTION / Feminist"
  ], 
  cover_img: "https://covers.openlibrary.org/b/id/12587630-S.jpg", 
  book_api_num: "OL25448287W"
)

Book.create!(
  title: "A Psalm for the Wild-Built", 
  author: "Becky Chambers",
  length: 160, 
  genre: [
    "American literature"
  ], 
  cover_img: "https://covers.openlibrary.org/b/id/10476616-S.jpg",
  book_api_num: "OL22561871W"
)

# add 5 journeys
maya_user_id = User.where("username = 'maya_admin'")[0].id

Journey.create!(book_id: Book.where("book_api_num = ?", "OL22561871W")[0].id, user_id: maya_user_id, start_date: Date.new(2023, 1, 3).to_fs(:db), end_date: nil, manually_completed: false, completed: false)
Journey.create!(book_id: Book.where("book_api_num = ?", "OL20794410W")[0].id, user_id: maya_user_id, start_date: Date.new(2022, 11, 17).to_fs(:db), end_date: nil, manually_completed: false)
Journey.create!(book_id: Book.where("book_api_num = ?", "OL25448287W")[0].id, user_id: maya_user_id, start_date: Date.new(2022, 12, 22).to_fs(:db), end_date: nil, manually_completed: false)
Journey.create!(book_id: Book.where("book_api_num = ?", "OL2944469W")[0].id, user_id: maya_user_id, start_date: Date.new(2022, 9, 19).to_fs(:db), end_date: nil, manually_completed: false)
Journey.create!(book_id: Book.where("book_api_num = ?", "OL25345096W")[0].id, user_id: maya_user_id, start_date: Date.new(2022, 11, 8).to_fs(:db), end_date: nil, manually_completed: false)

# add 4 journey entries of completion
JourneyEntry.create!(journey_id: Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL20794410W")[0].id)[0].id, date: Date.new(2022, 12, 21).to_fs(:db), progress: 100)
JourneyEntry.create!(journey_id: Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL25448287W")[0].id)[0].id, date: Date.new(2023, 1, 2).to_fs(:db), progress: 100)
JourneyEntry.create!(journey_id: Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL2944469W")[0].id)[0].id, date: Date.new(2022, 11, 29).to_fs(:db), progress: 100)
JourneyEntry.create!(journey_id: Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL25345096W")[0].id)[0].id, date: Date.new(2022, 11, 13).to_fs(:db), progress: 100)

# update initial journeys for completion
Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL20794410W")[0].id)[0].update!(completed: true, end_date: Date.new(2022, 12, 21).to_fs(:db))
Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL25448287W")[0].id)[0].update!(completed: true, end_date: Date.new(2023, 1, 2).to_fs(:db))
Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL2944469W")[0].id)[0].update!(completed: true, end_date: Date.new(2022, 11, 29).to_fs(:db))
Journey.where("book_id = ?", Book.where("book_api_num = ?", "OL25345096W")[0].id)[0].update!(completed: true, end_date: Date.new(2022, 11, 13).to_fs(:db))

# add annual reading challenge
Challenge.create!(name: "2023 Reading Challenge", description: "read 35 books during 2023 (5 more than 2022's goal)", start_date: Date.new(2023, 1, 1).to_fs(:db), end_date: Date.new(2023, 12, 31).to_fs(:db), user_id: maya_user_id, goal_number: 35, goal_type: "duration", category: nil, category_identifier: nil, active: true, successful: nil)

puts "Finished seeding admin account for demo 💅🏻"