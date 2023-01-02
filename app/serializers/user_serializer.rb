class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :screenname, :avatar_img, :created_at

  has_many :collections
  has_many :journeys
  has_many :challenges
  
end
