# Kafka and Zookeeper

FROM java:openjdk-8-jre

MAINTAINER Ujjawal Garg <ujjawal.1224@gmail.com>

ENV DEBIAN_FRONTEND noninteractive
ENV SCALA_VERSION 2.11
ENV KAFKA_VERSION 1.0.1
ENV KAFKA_HOME /opt/kafka_"$SCALA_VERSION"-"$KAFKA_VERSION"

# Install Kafka, Zookeeper and other needed things
RUN apt-get update && \
    apt-get install -y zookeeper wget supervisor dnsutils && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get clean && \
    wget -q http://apache.mirrors.spacedump.net/kafka/"$KAFKA_VERSION"/kafka_"$SCALA_VERSION"-"$KAFKA_VERSION".tgz -O /tmp/kafka_"$SCALA_VERSION"-"$KAFKA_VERSION".tgz && \
    tar xfz /tmp/kafka_"$SCALA_VERSION"-"$KAFKA_VERSION".tgz -C /opt && \
    rm /tmp/kafka_"$SCALA_VERSION"-"$KAFKA_VERSION".tgz

COPY scripts/start-kafka.sh /usr/bin/start-kafka.sh

# Supervisor config
COPY supervisor/kafka.conf supervisor/zookeeper.conf /etc/supervisor/conf.d/

# 2181 is zookeeper, 9092 is kafka
EXPOSE 2181 9092

# RUN echo "\n advertised.listeners=PLAINTEXT://localhost:9092" >> $KAFKA_HOME/config/server.properties

# Create topics
# COPY setup/create-topics.sh tmp/create-topics.sh
# RUN chmod +x tmp/create-topics.sh
# RUN tmp/create-topics.sh

# RUN cat $KAFKA_HOME/config/server.properties

CMD ["supervisord", "-n"]