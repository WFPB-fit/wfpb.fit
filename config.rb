# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

#Preprocess JSON data
#create an easy-to-use hash out of the health studies
config[:health] = {}
for study in data.health do
  tags = study.tags.downcase.split(',') #split up the tags
  for tag in tags do #add study to the hash under each one of its tags
    studies = config[:health].fetch(tag,[])
    studies.push(study)
    config[:health][tag] = studies
  end
end
print config[:health]

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def help
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  activate :minify_css
  activate :minify_javascript
end


after_build do |builder|
  begin
    HTMLProofer.check_directory(config[:build_dir], { assume_extension: true, http_status_ignore: [0, 999] }).run
  rescue RuntimeError => e
    puts e
  end
end
