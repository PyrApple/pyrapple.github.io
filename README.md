# Personal website repository


## Folder Content

* (underscore)config.yml: jekyll configuration file, created upon install

* (underscore)includes: home of html files to be included in others (footer, header, etc.)

* (underscore)layouts: defined html layouts, used by all pages in the site

* (underscore)sass: user defined formatting files

* (underscore)site: files created by jekyll when serving the website, no need to go there

* css: system formating files (bootstrap, etc.), no need to go there

* fonts: additional fonts added for bootstrap

* Gemfile: jekyll configuration file, created upon install

* Gemfile.lock: jekyll configuration file, created upon install

* img: home of website images

* index.html: home page

* js: system and user javascripts

* pages: home of all the website pages, but for the home page

* sounds: audio files of the website

* startJekyllServer.sh: shell script to start running the website locally

* vendor: local ruby gem installs, created by bundler (can be seen as an equivalent of node_packages or virtual env local pip folder)

## Typical install steps

to build a new website like this one from scratch

```
# general install of ruby, to avoid conflicts with the one shipped with osx
brew install ruby
# you'll have to add precedent for the new /usr/local ruby path over osx's after this step


# install bundler, equivalent of virtual env for ruby asa I understood
gem install bundler

# gem install --user-install bundler jekyll

# create website directory
mkdir pyrapple.github.io
cd pyrapple.github.io

# init bundle
bundle init

# configure bundle to install gems in the vendor/bundle directory
bundle install --path vendor/bundle

# add jekyll to bundle gems
chmod u+w Gemfile # no idea why it's not w yet, next step will fail otherwise
bundle add jekyll

# setup jekyll 
bundle exec jekyll new --force --skip-bundle .
bundle install

# serve the site
bundle exec jekyll serve

```

## Test website on local server

How to test commits on local server before pushing remote repository

### Install Jekyll

See instructions to set up a GitHub Pages site locally with Jekyll on [GitHub Help](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/).

### Start local server

Once jekyll installed as suggested in the previous section, use the following command in a terminal to start a local sever serving your local website @ http://localhost:4000/

```bash
bundle exec jekyll serve --baseurl ''
```

## Acknowledgments

Website theme based on a Jekyll implementation of the [Creative Theme](http://startbootstrap.com/template-overviews/creative/) template by [Start Bootstrap](http://startbootstrap.com).
