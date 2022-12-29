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