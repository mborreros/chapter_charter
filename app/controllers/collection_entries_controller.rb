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
    @books_array = BooksController.find_and_create_books(params[:book_data])
    new_collection_entries = Array.new
    @books_array.each do |book|
      new_collection_entry_record = CollectionEntry.create!(collection_id: params[:collection_id], book_id: book[:id])
      new_collection_entries << new_collection_entry_record
    end
    render json: new_collection_entries, status: :ok
  end

  def update
    this_collection_entry = CollectionEntry.find(params[:id])
    this_collection_entry.update(collection_entry_params)
    render json: this_collection_entry, status: :ok
  end

  def destroy
    this_collection_entry = CollectionEntry.find(params[:id])
    this_collection_entry.destroy
    render json: this_collection_entry.collection, status: :ok
  end

  private

  # def find_and_create_books(books)
  #   books_array = Array.new
  #   books.each do |book|
  #     if found_book = Book.find_by(book_api_num: book[:book_api_num])
  #       books_array << found_book
  #     else
  #       new_book = Book.create!(title: book[:title], author: book[:author], length: book[:length], cover_img: book[:cover_img], book_api_num: book[:book_api_num], genre: book[:genre])
  #       books_array << new_book
  #     end
  #   end
  #   return books_array
  # end

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
