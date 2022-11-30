set :output, "log/cron.log"

# everyday at midnight, system will check challenges and determine whether they remain active for the following day and whether the user successfully completed them
every :day, at: "12:00 AM" do
  rake 'challenge_status:check'
end
