class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :internship

  validates :internship_id, uniqueness: { scope: :user_id }
end
