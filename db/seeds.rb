def parse_chart_json(chart_json, topic)
  chart = topic.charts.create!(name: chart_json["title"],
                             slug: chart_json["slug"],
                             state: chart_json["state"])
  chart_json["estimates_by_date"].each do |poll|
    poll_date = poll["date"]
    poll["estimates"].each do |response|
      chart.responses.create!(date: poll_date,
                              answer: response["choice"],
                              percentage: response["value"])
    end
  end
end

states = %w( alabama alaska arizona arkansas california colorado connecticut
             delaware florida georgia hawaii idaho illinois indiana iowa kansas
             kentucky louisiana maine maryland massachusetts michigan minnesota
             mississippi missouri montana nebraska nevada new-hampshire new-jersey
             new-mexico new-york north-carolina north-dakota ohio oklahoma oregon
             pennsylvania rhode-island south-carolina south-dakota tennessee texas
             utah vermont virginia washington west-virginia wisconsin wyoming )

new_topic = Topic.create!(name: "Obama Job Approval")
base_slug = "obama-job-approval"
base_url = "http://elections.huffingtonpost.com/pollster/api/charts/"


chart_uri = URI(base_url + base_slug)
chart_response = Net::HTTP.get_response(chart_uri)
chart_json = JSON.parse(chart_response.body)
parse_chart_json(chart_json, new_topic)


states.each do |state|
  chart_uri = URI(base_url + state + "-" + base_slug)
  chart_response = Net::HTTP.get_response(chart_uri)
  chart_json = JSON.parse(chart_response.body)
  next if chart_json["errors"]
  parse_chart_json(chart_json, new_topic)
end
