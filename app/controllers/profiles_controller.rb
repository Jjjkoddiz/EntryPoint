class ProfilesController < ApplicationController
  before_action :authenticate_user!
  def show
    @internships = current_user.internships
  end
end
