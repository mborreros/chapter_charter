class CollectionEntriesController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    all_collection_entries = CollectionEntry.all
    render json: all_collection_entries, status: :ok
  end

  def show
    this_collection_entry = CollectionEntry.find(params[:id])
    render json: this_collection_entry, status: :ok
  end

  def create
    new_collection_entry = CollectionEntry.create!(collection_entry_params)
    render json: new_collection_entry, status: :ok
  end

  def update
    this_collection_entry = CollectionEntry.find(params[:id])
    this_collection_entry.update(collection_entry_params)
    render json: this_collection_entry, status: :ok
  end

  def destroy
    this_collection_entry = CollectionEntry.find(params[:id])
      this_collection_entry.destroy
      head :no_content
  end

  private

  def collection_entry_params
    params.permit(:collection_id, :book_id)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: "Collection Entry or Entries not found" }, status: :not_found
  end
end
