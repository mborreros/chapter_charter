class User < ApplicationRecord

  has_secure_password

  has_many :collections, dependent: :destroy
  has_many :journeys, dependent: :destroy
  has_many :books, through: :journeys
  has_many :challenges, dependent: :destroy
  has_many :challenge_entries, through: :challenges

  validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
  validates :password, presence: true, length: { minimum: 7 }
  validates :screenname, presence: true

end
