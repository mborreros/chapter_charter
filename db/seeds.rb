puts "Seeding book test data 📔"
  Book.create!(title: "Test Title 1", author: "Test Author 1", length: 100, genre: "test genre 1", cover_img: "https://picsum.photos/200/300")
  Book.create!(title: "Test Title 2", author: "Test Author 2", length: 200, genre: "test genre 2", cover_img: "https://picsum.photos/200/300")
  Book.create!(title: "Test Title 3", author: "Test Author 3", length: 300, genre: "test genre 3", cover_img: "https://picsum.photos/200/300")
  Book.create!(title: "Test Title 4", author: "Test Author 4", length: 400, genre: "test genre 4", cover_img: "https://picsum.photos/200/300")
  Book.create!(title: "Test Title 5", author: "Test Author 5", length: 500, genre: "test genre 5", cover_img: "https://picsum.photos/200/300")
puts "Finished seeding book test data 📔✨"

puts "Seeding user test data 👤"
  User.create!(username: "adam_user_test", password: "testing1", screenname: "Adam", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "beth_user_test", password: "testing2", screenname: "Beth", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "cleo_user_test", password: "testing3", screenname: "Cleo", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "david_user_test", password: "testing4", screenname: "David", avatar_img: "https://picsum.photos/200/300?blur=2")
  User.create!(username: "elaine_user_test", password: "testing5", screenname: "Elaine", avatar_img: "https://picsum.photos/200/300?blur=2")
puts "Finished seeding user test data 👤✨"

puts "Seeding collection test data 📚"

user_ids = User.all.ids

  Collection.create!(name: "Test Collection 1", description: "test description of collection 1", user_id: user_ids.sample)
  Collection.create!(name: "Test Collection 2", description: "test description of collection 2", user_id: user_ids.sample)
  Collection.create!(name: "Test Collection 3", description: "test description of collection 3", user_id: user_ids.sample)
  Collection.create!(name: "Test Collection 4", description: "test description of collection 4", user_id: user_ids.sample)
  Collection.create!(name: "Test Collection 5", description: "test description of collection 5", user_id: user_ids.sample)
puts "Finished seeding collection test data 📚✨"

puts "Seeding collection entries test data 📋"

book_ids = Book.all.ids
collection_ids = Collection.all.ids

  CollectionEntry.create!(collection_id: collection_ids.sample, book_id: book_ids[0])
  CollectionEntry.create!(collection_id: collection_ids.sample, book_id: book_ids[1])
  CollectionEntry.create!(collection_id: collection_ids.sample, book_id: book_ids[2])
  CollectionEntry.create!(collection_id: collection_ids.sample, book_id: book_ids[3])
  CollectionEntry.create!(collection_id: collection_ids.sample, book_id: book_ids[4])
puts "Finished seeding collection entries test data 📋✨"

puts "Seeding journey test data 🌐"

random_date = Date.new(2022, rand(12), rand(27))
completion_date = random_date.next_month

  # creating active journeys
  Journey.create!(book_id: book_ids.sample, user_id: 1, start_date: Date.new(2022, rand(12), rand(27)).to_fs(:db), end_date: nil, completed: false)
  Journey.create!(book_id: book_ids.sample, user_id: 2, start_date: Date.new(2022, rand(12), rand(27)).to_fs(:db), end_date: nil, completed: false)
  Journey.create!(book_id: book_ids.sample, user_id: 3, start_date: Date.new(2022, rand(12), rand(27)).to_fs(:db), end_date: nil, completed: false)

  # creating 2 completed journeys
  Journey.create!(book_id: book_ids.sample, user_id: 4, start_date: random_date.to_fs(:db), end_date: completion_date.to_fs(:db), completed: true)
  Journey.create!(book_id: book_ids.sample, user_id: 5, start_date: random_date.to_fs(:db), end_date: completion_date.to_fs(:db), completed: true)
puts "Finished journey test data 🌐✨"
