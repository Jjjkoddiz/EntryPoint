class Internship < ApplicationRecord
  belongs_to :company

  has_many :favorites
  has_many :users, through: :favorites
end
