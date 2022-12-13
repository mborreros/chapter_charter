class BooksController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

  skip_before_action :authorized, only: [:destroy]

  def index
    books = Book.all
    render json: books, status: :ok
  end

  def show
    book = Book.find(params[:id])
      render json: book, status: :ok
  end

  def create
    # debugger
    # if params[:_json]
    #   new_book = Array.new
    #   params[:_json].each do | book_record |
    #     new_book_record = Book.create!(title: book_record[:title], author: book_record[:author], length: book_record[:length], cover_img: book_record[:cover_img], book_api_num: book_record[:book_api_num], genre: book_record[:genre])
    #     new_book << new_book_record
    #   end
    # else 
    new_book = Book.create!(book_params)
    # end
    render json: new_book, status: :created
  end

  def destroy
    book = Book.find(params[:id])
      book.destroy
      head :no_content
  end

  private

  def book_params
    params.permit(:title, :author, :length, :cover_img, :book_api_num, :genre => [])
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages.to_sentence }, status: :unprocessable_entity
  end

  def render_not_found_response
    render json: { errors: "Book(s) not found" }, status: :not_found
  end

end
