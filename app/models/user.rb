class User < ApplicationRecord

  has_secure_password

  has_many :collections, dependent: :destroy
  has_many :journeys, dependent: :destroy
  has_many :books, through: :journeys
  has_many :challenges, dependent: :destroy
  has_many :challenge_entries, through: :challenges

  validates :username, presence: true, uniqueness: true
  # validates :password, presence: true
  # validates :screenname, uniqueness: true
  # validates :avatar_img, uniqueness: true

end
