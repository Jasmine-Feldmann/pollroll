def build_question_args(question)
  {
    state: question["state"] || "US",
    content: question["name"]
  }
end

def build_poll_args(poll)
  {
    pollster: poll["pollster"],
    start_date: poll["start_date"],
    end_date: poll["end_date"],
    source: poll["source"],
    partisan: poll["partisan"] != "Nonpartisan",
    affiliation: poll["affiliation"]
  }
end

def get_topic_name(question)
  if question["topic"] == nil || question["topic"] == ""
    question["name"]
  else
    question["topic"]
  end
end

file = File.open("db/data-files/polls_all.json")
file.readlines.each do |row|
  json = JSON.parse(row)
  json.each do |poll|
    poll_obj = Poll.create!(build_poll_args(poll))
    poll["questions"].each do |question|
      topic = Topic.find_or_create_by!(name: get_topic_name(question))
      question_obj = topic.questions.create!(build_question_args(question))
      question["subpopulations"].each do |pop|
        size = pop["observations"]
        pop["responses"].each do |r|
          Response.create!({ percentage: r["value"],
                             answer: r["choice"],
                             poll_id: poll_obj.id,
                             question_id: question_obj.id,
                             sample_size: size })
        end
      end
    end
  end
end
