#!/usr/bin/env sh

# abort on errors
set -e
# build
npm run build
cd dist

git init
git add -A
git commit -m 'deploy'


git push -f https://github.com/waltzHao/verification-code.git main:gh-pages

cd -