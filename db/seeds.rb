# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'pry'
require 'json'

file = File.open("data-files/polls_all.json")
file.readlines.each do |row|
  json = JSON.parse(row)
  binding.pry
end
