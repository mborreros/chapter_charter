namespace :challenge_status do
  desc "review active challenges and their completion status, updates their active and successful status based on end_date and amount of challenge entries associated with it"
  task :check => [:environment] do
    today = Date.current.to_fs(:db)
    puts 'starting check of challenges for ' + today
    challenges = Challenge.where("active = true AND end_date < ?", today)
    challenges.each do |challenge|
      entries_count = challenge.challenge_entries.count
      is_successful = entries_count < challenge.goal_number ? false : true
      challenge.update!(active: false, successful: is_successful)
    end
    puts 'finished checking challenges for ' + today
  end

end