class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password
      t.string :screenname
      t.string :avatar_img

      t.timestamps
    end
  end
end
