class User < ApplicationRecord

  has_secure_password

  has_many :collections, dependent: :destroy
  has_many :journeys, dependent: :destroy
  has_many :books, through: :journeys
  has_many :challenges, dependent: :destroy
  has_many :challenge_entries, through: :challenges

  validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
  validates :screenname, presence: true
  validates_length_of :password, minimum: 7, on: :create

end
