# Personal website

A Jekyll portfolio based on Start Bootstrap's Creative theme.

## Run locally

This project uses Ruby **3.1.2** and Bundler **2.2.15**.
`.ruby-version` records the Ruby version for version managers. On this Mac,
Ruby is already installed in `~/.rubies/ruby-3.1.2`; the launcher selects it.
On another machine, install that Ruby version with your preferred version manager.

For the first setup, activate Ruby 3.1.2, then run:

```sh
# On this Mac, select the existing Ruby:
export PATH="$HOME/.rubies/ruby-3.1.2/bin:$PATH"

gem install bundler -v 2.2.15
bundle config set --local path vendor/bundle
bundle install
```

From the repository directory:

```sh
./startJekyllServer.sh
```

Open http://127.0.0.1:8000. Stop the server with Ctrl+C.
Restart after changing `_config.yml`.

To preview unfinished projects too:

```sh
./startJekyllServer.sh --unpublished
```

## Edit content

- `pages/_projects/`: project pages, sorted by `year` on the homepage and menu.
- `pages/_others/`: teaching, small developments and other pages.
- `pages/`: CV, biography and publications.
- `img/` and `sounds/`: media, including work in progress. Keep unused files here.

Copy an existing project page and edit its front matter and HTML. For example:

```yaml
---
title: My Project
year: 2026
description: A short summary.
thumbnail: my-thumbnail.jpg
published: false
---
```

`published: false` keeps an unfinished page out of normal builds and menus.
Remove that line when ready to publish. `hidden: true` only hides a published
project from the homepage and Projects menu; its URL remains accessible.

Pages under `pages/` inherit their layout from `_config.yml`; there is no need
to repeat it in each page. The homepage sets its layout in `index.html`.
Images resize automatically. Use ordinary HTML:

```html
<img src="{{ site.baseurl }}/img/my-image.jpg" alt="What the image shows">
```

Add `class="borderless"` only when you want to remove an image's border.
Keep a short inline `max-width` for an image that needs a particular size.
For videos, keep the existing `embed-responsive embed-responsive-16by9` wrapper;
for side-by-side content, use Bootstrap 3 `row` and `col-sm-6` classes.

Page titles and descriptions also fill the browser title and description metadata.
Pages without a description use the site description from `_config.yml`.

## Shared files

- `_layouts/default.html`: shared page structure and title.
- `_includes/`: navigation, head metadata, footer and scripts.
- `_sass/_base.scss`: shared appearance; `_mixins.scss`: reusable Sass helpers.
- `css/main.scss`: Sass entry point; Bootstrap **3.3.2** and Animate.css are vendor styles.
- `js/creative.js` and `js/personal.js`: shared browser behavior.
- `pages/publications.html`: publication markup; `js/publications.js`: HAL fetching.
- `_config.yml`: site settings, collections and build exclusions.
- `Gemfile` and `Gemfile.lock`: Ruby dependencies and their exact resolved versions.

`_site/` is generated output. `vendor/`, `.bundle/` and `.jekyll-cache/` are local
build files. `wip/`, `todo/`, local notes and shell scripts are excluded from the
site; keep research drafts there rather than in public asset folders.

## Check before publishing

With Ruby 3.1.2 active, build the normal site (without `--unpublished`):

```sh
bundle exec jekyll build
bundle exec htmlproofer --disable-external --empty-alt-ignore ./_site
```

Remove `--disable-external` to check external links too (requires network access).
HTMLProofer cannot check publications rendered later by the HAL JavaScript or
embedded media players.

## Acknowledgments

Based on a Jekyll implementation of the [Creative theme](https://startbootstrap.com/theme/creative)
by [Start Bootstrap](https://startbootstrap.com/).
