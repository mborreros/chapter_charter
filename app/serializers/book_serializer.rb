class BookSerializer < ActiveModel::Serializer

  attributes :id, :title, :author, :length, :genre, :cover_img

end
