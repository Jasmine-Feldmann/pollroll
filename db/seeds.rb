def parse_chart_json(chart_json, topic)
  return if chart_json["estimates_by_date"].empty?
  chart = topic.charts.create!(name: chart_json["title"],
                             slug: chart_json["slug"],
                             state: chart_json["state"])
  chart_json["estimates_by_date"].each do |poll|
    next if poll["estimates"].length < 3
    poll_date = poll["date"]
    poll["estimates"].each do |response|
      chart.responses.create!(date: poll_date,
                              answer: response["choice"],
                              percentage: response["value"])
    end
  end
  return chart
end

def interpolate_responses(chart, min_responses)
  interpolation_factor = (min_responses.to_f / chart.responses.length).ceil
  chart.responses.each do |response|
    (interpolation_factor-1).times do
      chart.responses.create!(answer: response.answer,
                              percentage: response.percentage,
                              date: response.date)
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
  chart = parse_chart_json(chart_json, new_topic)
  if chart && chart.responses.length < 90
    interpolate_responses(chart, 90)
  end
end

# gop_primary = Topic.create!(name: "2016 National GOP Primary")
# gop_slug = "2016-national-gop-primary"

# gop_uri = URI(base_url + gop_slug)
# gop_response = Net::HTTP.get_response(gop_uri)
# gop_json = JSON.parse(gop_response.body)
# parse_chart_json(gop_json, gop_primary)

# dem_primary = Topic.create!(name: "2016 National Democratic Primary")
# dem_slug = "2016-national-democratic-primary"

# dem_uri = URI(base_url + dem_slug)
# dem_response = Net::HTTP.get_response(dem_uri)
# dem_json = JSON.parse(dem_response.body)
# parse_chart_json(dem_json, dem_primary)

# obama_foreign_policy = Topic.create!(name: "Obama Job Approval - Foreign Policy")
# fp_slug = "obama-job-approval-foreign-policy"

# fp_uri = URI(base_url + fp_slug)
# fp_response = Net::HTTP.get_response(fp_uri)
# fp_json = JSON.parse(fp_response.body)
# parse_chart_json(fp_json, obama_foreign_policy)

topic_array = [{name: "2016 National GOP Primary", slug: "2016-national-gop-primary"},
               {name: "2016 National Democratic Primary", slug: "2016-national-democratic-primary"},
               {name: "Obama Job Approval - Foreign Policy", slug: "obama-job-approval-foreign-policy"}]

topic_array.each do |topic_hash|
  new_topic = Topic.create!(name: topic_hash[:name])
  slug = topic_hash[:slug]
  base_url = "http://elections.huffingtonpost.com/pollster/api/charts/"
  chart_uri = URI(base_url + slug)
  chart_response = Net::HTTP.get_response(chart_uri)
  chart_json = JSON.parse(chart_response.body)
  parse_chart_json(chart_json, new_topic)
end

