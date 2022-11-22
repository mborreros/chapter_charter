class ChallengeSerializer < ActiveModel::Serializer

  attributes :id, :name, :description, :start_date, :end_date, :goal_number, :goal_type, :category, :category_identifier, :challenge_progress, :active, :successful

  belongs_to :user

  # shows current progress on challenge based on how many challenge entries
  def challenge_progress
    self.object.challenge_entries.count/self.object.goal_number.to_f*100
  end

end
