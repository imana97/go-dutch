rm -rf public/*
cd ui
npm run build
cd ..
cp -r ./ui/build/* ./public/