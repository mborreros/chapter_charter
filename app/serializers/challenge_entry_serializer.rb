class ChallengeEntrySerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :book
  belongs_to :challenge
  has_one :user, through: :challenge
end
