class InternshipsController < ApplicationController
  load_and_authorize_resource
  before_action :set_internship, only: %i[ show edit update destroy ]

  # GET /internships or /internships.json
  def index
    @internships = Internship.all
  end

  # GET /internships/1 or /internships/1.json
  def show
  end

  # GET /internships/new
  def new
    @internship = Internship.new
  end

  # GET /internships/1/edit
  def edit
  end

  # POST /internships or /internships.json
  def create
    @internship = Internship.new(internship_params)

    respond_to do |format|
      if @internship.save
        format.html { redirect_to @internship, notice: "Internship was successfully created." }
        format.json { render :show, status: :created, location: @internship }
      else
        format.html { render :new, status: :unprocessable_content }
        format.json { render json: @internship.errors, status: :unprocessable_content }
      end
    end
  end

  # PATCH/PUT /internships/1 or /internships/1.json
  def update
    respond_to do |format|
      if @internship.update(internship_params)
        format.html { redirect_to @internship, notice: "Internship was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @internship }
      else
        format.html { render :edit, status: :unprocessable_content }
        format.json { render json: @internship.errors, status: :unprocessable_content }
      end
    end
  end

  # DELETE /internships/1 or /internships/1.json
  def destroy
    @internship.destroy!

    respond_to do |format|
      format.html { redirect_to internships_path, notice: "Internship was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_internship
      @internship = Internship.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def internship_params
      params.expect(internship: [ :company_id, :title, :description, :location, :format, :salary, :deadline, :source_url ])
    end
end
