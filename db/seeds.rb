file = File.open("data-files/polls_all.json")
file.readlines.each do |row|
  json = JSON.parse(row)
  json.each do |poll|
    poll_obj = Poll.create!(build_poll_args(poll))
    poll["questions"].each do |question|
      topic = Topic.find_or_create_by(name: question["topic"] || question["name"])
      question_obj = topic.questions.create!(build_question_args(question))
      question["subpopulations"].each do |pop|
        size = pop["observations"]
        pop["responses"].each do |r|
          Response.create!(build_response_args(r, poll_obj.id, question_obj.id))
        end
      end
    end
  end
end

def build_response_args(response, p_id, q_id)
  {
    percentage: response["value"],
    answer: response["choice"],
    poll_id: p_id,
    question_id: q_id
  }
end

def build_question_args(question)
  {
    state: question["state"],
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
