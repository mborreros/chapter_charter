# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding book test data 📔"

Book.create!(title: "Test Title 1", author: "Test Author 1", length: 100, genre: "test genre 1", cover_img: "https://picsum.photos/200/300")
Book.create!(title: "Test Title 2", author: "Test Author 2", length: 200, genre: "test genre 2", cover_img: "https://picsum.photos/200/300")
Book.create!(title: "Test Title 3", author: "Test Author 3", length: 300, genre: "test genre 3", cover_img: "https://picsum.photos/200/300")
Book.create!(title: "Test Title 4", author: "Test Author 4", length: 400, genre: "test genre 4", cover_img: "https://picsum.photos/200/300")
Book.create!(title: "Test Title 5", author: "Test Author 5", length: 500, genre: "test genre 5", cover_img: "https://picsum.photos/200/300")

puts "Finished seeding book test data 📔✨"

puts "Seeding user test data 📔"

User.create!(username: "adam_user_test", password: "testing1", screenname: "Adam", avatar_img: "https://picsum.photos/200/300?blur=2")
User.create!(username: "beth_user_test", password: "testing2", screenname: "Beth", avatar_img: "https://picsum.photos/200/300?blur=2")
User.create!(username: "cleo_user_test", password: "testing3", screenname: "Cleo", avatar_img: "https://picsum.photos/200/300?blur=2")
User.create!(username: "david_user_test", password: "testing4", screenname: "David", avatar_img: "https://picsum.photos/200/300?blur=2")
User.create!(username: "elaine_user_test", password: "testing5", screenname: "Elaine", avatar_img: "https://picsum.photos/200/300?blur=2")

puts "Finished seeding user test data 📔✨"