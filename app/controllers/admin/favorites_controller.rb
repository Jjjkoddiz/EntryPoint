class Admin::FavoritesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_favorite, only: %i[show edit update destroy]

  def index
    @favorites = current_user.favorites.includes(internship: :company)
  end

  def show
  end

  def new
    @favorite = Favorite.new
  end

  def edit
  end

  def create
    internship = Internship.find(params[:internship_id])
    current_user.favorites.find_or_create_by!(internship: internship)

    redirect_back fallback_location: admin_internships_path,
                  notice: "Стажировка добавлена в избранное",
                  status: :see_other
  end

  def update
    respond_to do |format|
      if @favorite.update(favorite_params)
        format.html { redirect_to [:admin, @favorite], notice: "Избранное обновлено.", status: :see_other }
        format.json { render :show, status: :ok, location: @favorite }
      else
        format.html { render :edit, status: :unprocessable_content }
        format.json { render json: @favorite.errors, status: :unprocessable_content }
      end
    end
  end

  def destroy
    @favorite.destroy!

    redirect_back fallback_location: admin_internships_path,
                  notice: "Стажировка удалена из избранного",
                  status: :see_other
  end

  private

  def set_favorite
    @favorite = current_user.favorites.find(params.expect(:id))
  end

  def favorite_params
    params.expect(favorite: [:internship_id])
  end
end
