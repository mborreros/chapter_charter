# from tutorial through canvas
# #!/usr/bin/env bash
# # exit on error
# set -o errexit

# bundle install
# # bundle exec rake assets:precompile # These lines are commented out because we have an API only app
# # bundle exec rake assets:clean
# bundle exec rake db:migrate 
# # bundle exec rake db:seed

#!/usr/bin/env bash
# exit on error
set -o errexit

# Add build commands for front end
rm -rf public
npm install --prefix client && npm run build --prefix client
cp -a client/build/. public/

bundle install
bundle exec rake db:migrate 

# # from tutorial through how to deploy react with rails
# #!/usr/bin/env bash
# # exit on error
# set -o errexit

# bundle install
# # clean
# rm -rf public
# # build
# npm install --prefix client && npm run build --prefix client
# # migrate
# bundle exec rake db:migrate
# # postbuild
# cp -a client/build/. public/