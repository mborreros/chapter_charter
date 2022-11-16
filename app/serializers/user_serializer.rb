class UserSerializer < ActiveModel::Serializer

  attributes :id, :username, :password, :screenname, :avatar_img

  has_many :collections
  
end
