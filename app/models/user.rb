class User < ApplicationRecord

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, uniqueness: true
  validates :screenname, presence: true, uniqueness: true
  validates :avatar_img, presence: true

end
