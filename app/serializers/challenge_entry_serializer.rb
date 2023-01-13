class ChallengeEntrySerializer < ActiveModel::Serializer
  attributes :id, :challenge_id, :journey_entry_id

  belongs_to :book
  belongs_to :challenge
  belongs_to :journey_entry

end
