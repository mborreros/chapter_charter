class JourneySerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :completed

  belongs_to :user
  belongs_to :book

end
