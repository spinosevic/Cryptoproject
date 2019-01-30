class User < ApplicationRecord
  has_secure_password
  has_many :items, dependent: :destroy
  validates :email, uniqueness: true
  validates :username, uniqueness: true

end
