FROM java:openjdk-8-jre

MAINTAINER Ujjawal Garg <ujjawal.1224@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

# Spark dependencies
ENV APACHE_SPARK_VERSION 2.4.0
ENV HADOOP_VERSION 2.7

RUN apt-get -y update \
 && apt-get install -yq --no-install-recommends \
 	python \
 	python-dev \
    wget \
    supervisor \
    dnsutils \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Download get-pip.py file to '/tmp' directory
RUN wget --directory-prefix /tmp https://bootstrap.pypa.io/get-pip.py
# Install pip
RUN python /tmp/get-pip.py
# Remove '/tmp/get-pip.py' file
RUN rm /tmp/get-pip.py

RUN cd /tmp  \
 && wget -q http://apache.claz.org/spark/spark-${APACHE_SPARK_VERSION}/spark-${APACHE_SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz \
 &&	tar xzf spark-${APACHE_SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz -C /opt --owner root --group root --no-same-owner \
 && rm spark-${APACHE_SPARK_VERSION}-bin-hadoop${HADOOP_VERSION}.tgz

RUN cd /opt && ln -s spark-${APACHE_SPARK_VERSION}-bin-hadoop${HADOOP_VERSION} spark

# Spark config
ENV SPARK_HOME /opt/spark
ENV PYTHONPATH $SPARK_HOME/python:$SPARK_HOME/python/lib/py4j-0.10.6-src.zip
ENV SPARK_OPTS --driver-java-options=-Xms512M --driver-java-options=-Xmx2048M --driver-java-options=-Dlog4j.logLevel=info

RUN pip install kafka-python

COPY spark_stream/spark_stream.py /usr/bin/spark_stream.py
COPY spark_stream/spark-streaming-kafka-0-8-assembly_2.11-2.3.0.jar /usr/bin/spark-streaming-kafka-0-8-assembly_2.11-2.3.0.jar
COPY spark_stream/pyspark.sh /usr/bin/start-pyspark.sh
RUN chmod +x /usr/bin/start-pyspark.sh

# Supervisor config
COPY supervisor/pyspark.conf /etc/supervisor/conf.d/

CMD ["supervisord", "-n"]
