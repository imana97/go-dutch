echo "clear public folder"
rm -rf public/*
cd ui
echo "Build the UI from source code"
npm run build
cd ..
echo "replace public files"
cp -r ./ui/build/* ./public/
echo "commit changes"
git add .
git commit -am "new deployment"
git push dokku main:master
