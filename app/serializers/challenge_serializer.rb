class ChallengeSerializer < ActiveModel::Serializer

  attributes :id, :name, :description, :start_date, :end_date, :goal_number, :goal_type, :category, :category_identifier, :active, :successful

  belongs_to :user

end
