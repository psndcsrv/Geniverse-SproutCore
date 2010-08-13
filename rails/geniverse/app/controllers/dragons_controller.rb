class DragonsController < ApplicationController
  # GET /dragons
  # GET /dragons.xml
  def index
    @dragons = Dragon.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @dragons }
      format.json { render :json => @dragons }
    end
  end

  # GET /dragons/1
  # GET /dragons/1.xml
  def show
    @dragon = Dragon.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @dragon }
      format.json { render :json => @dragon }
    end
  end

  # GET /dragons/new
  # GET /dragons/new.xml
  def new
    @dragon = Dragon.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @dragon }
    end
  end

  # GET /dragons/1/edit
  def edit
    @dragon = Dragon.find(params[:id])
  end

  # POST /dragons
  # POST /dragons.xml
  def create
    @dragon = Dragon.new(params[:dragon])

    respond_to do |format|
      if @dragon.save
        format.html { redirect_to(@dragon, :notice => 'Dragon was successfully created.') }
        format.xml  { render :xml => @dragon, :status => :created, :location => @dragon }
        format.json { render :json => @dragon, :status => :created, :location => @dragon }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @dragon.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /dragons/1
  # PUT /dragons/1.xml
  def update
    @dragon = Dragon.find(params[:id])

    respond_to do |format|
      if @dragon.update_attributes(params[:dragon])
        format.html { redirect_to(@dragon, :notice => 'Dragon was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @dragon.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /dragons/1
  # DELETE /dragons/1.xml
  def destroy
    @dragon = Dragon.find(params[:id])
    @dragon.destroy

    respond_to do |format|
      format.html { redirect_to(dragons_url) }
      format.xml  { head :ok }
    end
  end
end
