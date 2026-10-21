class Subscription < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :email,
            presence: true,
            uniqueness: { case_insensitive: true },
            format: { with: VALID_EMAIL_REGEX }
end
