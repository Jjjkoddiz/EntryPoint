class Admin::CompaniesController < ApplicationController
  before_action :set_company, only: %i[ show edit update destroy ]

  # GET /admin/companies
  def index
    @companies = Company.all
  end

  # GET /admin/companies/1
  def show
  end

  # GET /admin/companies/new
  def new
    @company = Company.new
  end

  # GET /admin/companies/1/edit
  def edit
  end

  # POST /admin/companies
  def create
    @company = Company.new(company_params)

    respond_to do |format|
      if @company.save
        format.html { redirect_to [:admin, @company], notice: "Company was successfully created." }
        format.json { render :show, status: :created, location: @company }
      else
        format.html { render :new, status: :unprocessable_content }
        format.json { render json: @company.errors, status: :unprocessable_content }
      end
    end
  end

  # PATCH/PUT /admin/companies/1
  def update
    respond_to do |format|
      if @company.update(company_params)
        format.html { redirect_to [:admin, @company], notice: "Company was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @company }
      else
        format.html { render :edit, status: :unprocessable_content }
        format.json { render json: @company.errors, status: :unprocessable_content }
      end
    end
  end

  # DELETE /admin/companies/1
  def destroy
    @company.destroy!

    respond_to do |format|
      format.html { redirect_to admin_companies_path, notice: "Company was successfully destroyed.", status: :see_other }
      format.json { head :no_content }
    end
  end

  private
    def set_company
      @company = Company.find(params.expect(:id))
    end

    def company_params
      params.expect(company: [ :name, :description, :website, :logo ])
    end
end
