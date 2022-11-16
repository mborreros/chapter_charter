class User < ApplicationRecord

  has_many :collections
  has_many :journeys
  has_many :books, through: :journeys

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, uniqueness: true
  validates :screenname, presence: true, uniqueness: true
  validates :avatar_img, presence: true

end
