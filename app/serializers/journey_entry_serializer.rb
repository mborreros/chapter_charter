class JourneyEntrySerializer < ActiveModel::Serializer
  attributes :id, :journey_id, :date, :progress
end
