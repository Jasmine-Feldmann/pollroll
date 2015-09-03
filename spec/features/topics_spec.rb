require 'rails_helper'

feature "Selecting topics" do

  scenario "when a user visits the homepage, they can select a topic", :js => true do
    visit '/'
    page.select "Obama Job Approval", :from => "topics-dropdown"
    expect(page).to have_content('Predictions')
  end

  # scenario "when a user visits a secondary topic page, they see a bar chart", :js => true do
  #   visit '/#topics/2'
  #   expect(page).to have_css('#bar-graph')
  # end

  # scenario "when a user visits a secondary topic page, they can click the 'trends' tab and see a line chart", :js => true do
  #   visit '/#topics/2'
  #   page.click('Trends')
  #   expect(page).to have_css('#line-graph')
  # end

end
