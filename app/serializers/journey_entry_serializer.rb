class JourneyEntrySerializer < ActiveModel::Serializer
  attributes :id, :journey_id, :date, :progress

  belongs_to :journey
  has_one :user, through: :journey
  has_one :book, through: :journey
  
end
