# what-apy

## Docker
docker build -t <NAME> .
docker run -it --rm -p 8080:3000 -p 5000:5000 <NAME>

## Deploy script
Add to nginx config
```
sudo rm -rf build
tar -xzvf build.tar.gz
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r build/* /usr/share/nginx/html
```