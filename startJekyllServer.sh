#!/bin/sh
set -eu
cd "$(dirname "$0")"

# Use this Mac's installed Ruby when available; otherwise use the active Ruby.
ruby_version=$(cat .ruby-version)
if [ -d "$HOME/.rubies/ruby-$ruby_version/bin" ]; then
    export PATH="$HOME/.rubies/ruby-$ruby_version/bin:$PATH"
fi

exec bundle exec jekyll serve --host 127.0.0.1 --port 8000 "$@"
# exec bundle exec jekyll serve --host 127.0.0.1 --port 8000 "$@" --unpublished