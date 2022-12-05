class CollectionsController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    if params[:user_id]
      this_user = User.find(params[:user_id])
      collections = this_user.collections
    else
      collections = Collection.all
    end
    render json: collections, status: :ok
  end

  def show
    collection = Collection.find(params[:id])
    render json: collection, status: :ok
  end

  def create
    new_collection = Collection.create!(collection_params)
    render json: new_collection, status: :created
  end

  def update
    collection = Collection.find(params[:id])
    collection.update(collection_params)
    render json: collection, status: :ok
  end

  def destroy
    collection = Collection.find(params[:id])
      collection.destroy
      head :no_content
  end

  private

  def collection_params
    params.permit(:name, :description, :user_id)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: "Collection(s) not found" }, status: :not_found
  end

end
