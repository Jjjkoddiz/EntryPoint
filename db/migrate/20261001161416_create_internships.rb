class CreateInternships < ActiveRecord::Migration[8.1]
  def change
    create_table :internships do |t|
      t.references :company, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.string :location
      t.string :format
      t.string :salary
      t.date :deadline
      t.string :source_url

      t.timestamps
    end
  end
end
