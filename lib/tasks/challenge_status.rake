namespace :challenge_status do
  desc "review active challenges and their completion status, updates their active and successful status based on end_date and amount of challenge entries associated with it"
  task :check => [:environment] do
    today = Date.current.to_fs(:db)
    puts 'starting check of challenges for ' + today
    challenges_to_end = Challenge.where("active = true AND end_date < ?", today)
    challenges_to_end.each do |challenge|
      entries_count = challenge.challenge_entries.count
      is_successful = entries_count < challenge.goal_number ? false : true
      challenge.update!(active: false, successful: is_successful)
    end
    challenges_to_start = Challenge.where("active = false AND start_date = ?", today)
    challenges_to_start.each do |challenge|
      challenge.update!(active: true)
    end
    puts 'finished checking challenges for ' + today
  end

end