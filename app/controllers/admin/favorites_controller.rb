class Admin::FavoritesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_favorite, only: %i[ show edit update destroy ]

  
  def index
    @favorites = Favorite.all
  end

  # GET /admin/favorites/1
  def show
  end

  # GET /admin/favorites/new
  def new
    @favorite = Favorite.new
  end

  # GET /admin/favorites/1/edit
  def edit
  end

  # POST /admin/favorites 
  def create
    internship = Internship.find(params[:internship_id])
    favorite = current_user.favorites.find_or_initialize_by(internship: internship)

    if favorite.new_record?
      favorite.save
      
      redirect_to [:admin, internship], notice: "Стажировка добавлена в избранное"
    else
      redirect_to [:admin, internship], alert: "Эта стажировка уже в избранном"
    end
  end

  # PATCH/PUT /admin/favorites/1
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

  # DELETE /admin/favorites/1 
  def destroy
    @favorite.destroy!

    respond_to do |format|
      
      format.html { redirect_back fallback_location: admin_profile_path, notice: "Удалено из избранного.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    def set_favorite
      @favorite = Favorite.find(params.expect(:id))
    end

    def favorite_params
      params.expect(favorite: [ :user_id, :internship_id ])
    end
end
