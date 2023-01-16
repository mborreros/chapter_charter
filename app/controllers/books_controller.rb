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

  def self.find_and_create_books(bookData)
    if bookData.kind_of?(Array)
      books_array = Array.new
      bookData.each do |book|
        if found_book = Book.find_by(book_api_num: book[:book_api_num])
          books_array << found_book
        else
          new_book = Book.create!(title: book[:title], author: book[:author], length: book[:length], cover_img: book[:cover_img], book_api_num: book[:book_api_num], genre: book[:genre])
          books_array << new_book
        end
      end
      return books_array

    else
      if found_book = Book.find_by(book_api_num: bookData[:book_api_num])
        return found_book
      else
        new_book = Book.create!(title: bookData[:title], author: bookData[:author], length: bookData[:length], cover_img: bookData[:cover_img], book_api_num: bookData[:book_api_num], genre: bookData[:genre])
        return new_book
      end
    end
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
