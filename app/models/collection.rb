class Collection < ApplicationRecord

  belongs_to :user

  validates :name, presence: true, length: { minimum: 1 }
  validates :description, presence: true, length: { maximum: 250 }
  validates :user_id, presence: true

end
