class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :password_digest, :screenname, :avatar_img

  has_many :collections
  has_many :journeys
  has_many :challenges
  
end
