class ChallengeSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :start_date, :end_date, :user_id, :goal_number, :tracker, :category
end
