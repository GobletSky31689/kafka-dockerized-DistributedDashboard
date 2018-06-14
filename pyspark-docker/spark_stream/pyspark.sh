#!/bin/sh

# Run Spark app
$SPARK_HOME/bin/spark-submit --jars /usr/bin/spark-streaming-kafka-0-8-assembly_2.11-2.3.0.jar /usr/bin/spark_stream.py 10.0.0.19:9092 input output 5