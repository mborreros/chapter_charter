class ChallengeEntrySerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :book
  belongs_to :challenge
  belongs_to :journey_entry

end
