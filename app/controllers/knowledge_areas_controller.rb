class KnowledgeAreasController < ApplicationController
  before_action :set_knowledge_area, only: %i[ show edit update destroy ]
  

  # GET /knowledge_areas or /knowledge_areas.json
  def index
    @knowledge_areas = KnowledgeArea.all
  end

  # GET /knowledge_areas/1 or /knowledge_areas/1.json
  def show
  end

  # GET /knowledge_areas/new
  def new
    @knowledge_area = KnowledgeArea.new
  end

  # GET /knowledge_areas/1/edit
  def edit
  end

  # POST /knowledge_areas or /knowledge_areas.json
  def create
    @knowledge_area = KnowledgeArea.new(knowledge_area_params)

    respond_to do |format|
      if @knowledge_area.save
        format.html { redirect_to knowledge_area_url(@knowledge_area), notice: "Knowledge area was successfully created." }
        format.json { render :show, status: :created, location: @knowledge_area }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @knowledge_area.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /knowledge_areas/1 or /knowledge_areas/1.json
  def update
    respond_to do |format|
      if @knowledge_area.update(knowledge_area_params)
        format.html { redirect_to knowledge_area_url(@knowledge_area), notice: "Knowledge area was successfully updated." }
        format.json { render :show, status: :ok, location: @knowledge_area }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @knowledge_area.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /knowledge_areas/1 or /knowledge_areas/1.json
  def destroy
    @knowledge_area.destroy

    respond_to do |format|
      format.html { redirect_to knowledge_areas_url,status: :see_other ,notice: "Knowledge area was successfully destroyed." }
     
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_knowledge_area
      @knowledge_area = KnowledgeArea.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def knowledge_area_params
      params.require(:knowledge_area).permit(:name, :description)
    end
end
