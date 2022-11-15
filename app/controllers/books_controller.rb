class BooksController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  def index
    books = Book.all
    render json: books, status: :ok
  end

  def show
    book = Book.find(params[:id])
      render json: book, status: :ok
  end

  def create
    new_book = Book.create!(book_params)
    render json: new_book, status: :created
  end

  def destroy
    book = Book.find(params[:id])
      book.destroy
      head :no_content
  end

  private

  def book_params
    params.permit(:title, :author, :length, :genre, :cover_img)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: "Book(s) not found" }, status: :not_found
  end

end
