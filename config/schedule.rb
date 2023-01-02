set :output, "log/cron.log"
set :environment, "development"

# everyday at midnight, system will check challenges and determine whether they remain active for the following day and whether the user successfully completed them
every :day, at: "12:00 AM" do
  rake 'challenge_status:check'
end

# for presentation purposes to demonstrate schedule rake task
  # create a challenge with start date today through the web app form
  # in terminal rails c, manually find that challenge by id and update it to active: false
  # restart rails server and allow the scheuled code to run every 3 minutes, view updates on the server and web app
# every 3.minute do
#   rake 'challenge_status:check'
# end
