docker build -t pyspark-docker ./pyspark-docker/

docker build -t kafka-docker ./kafka-docker/

docker build -t node-docker ./node-docker/




docker run --name kafka -p 2181:2181 -p 9092:9092 kafka-docker

docker run --name spark  pyspark-docker

docker run --name dashboard -p 3000:8080 node-docker




python stats-client/stats.py <server-ip>:3000 <freq>