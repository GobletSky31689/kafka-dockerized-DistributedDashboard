sudo apt update
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker




sudo docker build -t kafka-docker ./kafka-docker/
sudo docker build -t pyspark-docker ./pyspark-docker/
sudo docker build -t node-docker ./node-docker/
sudo docker run --name kafka -p 2181:2181 -p 9092:9092 -d kafka-docker
sudo docker run --name spark  pyspark-docker
sudo docker run --name dashboard -p 3000:8080 -d node-docker
sudo docker system prune



python stats-client/stats.py <server-ip>:3000 <freq>