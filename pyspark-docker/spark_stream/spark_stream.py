from pyspark import SparkContext
from pyspark.streaming import StreamingContext
from pyspark.streaming.kafka import KafkaUtils
from kafka import KafkaProducer

import json, sys

if len(sys.argv) != 5:
	print("Usage: spark_stream <bootstrap-servers> <input-topic> <output-topic> <frequency>")
	sys.exit(0)

bootstrap_servers = sys.argv[1]
inTopic = sys.argv[2]
outTopic = sys.argv[3]
frequency = int(sys.argv[4])

kafkaProducer = KafkaProducer(bootstrap_servers = bootstrap_servers)

sc = SparkContext(appName="logAggregator")

ssc = StreamingContext(sc, frequency)

kafkaDirectStream = KafkaUtils.createDirectStream(ssc, [inTopic], {
	'metadata.broker.list': bootstrap_servers
	})


def mapper(x):
	# print(x)
	j_x = json.loads(x[1])
	return j_x['uuid'], (j_x['cpu'], j_x['mem'])

def valueMapper_1(V):
	return (V[0], V[1], 1)

def keyReducer(t1, t2):
	return (t1[0] + t2[0], t1[1] + t2[1], t1[2] + t2[2])

def valueMapper_2(V):
	return V[0] / V[2], V[1] / V[2]

def produceMessage(time, rdd):
	rdd_list = rdd.collect()
	message = {}
	for entry in rdd_list:
		message[entry[0]] = {
			'cpu': entry[1][0],
			'mem': entry[1][1]
		}
	kafkaProducer.send(outTopic, json.dumps(message))


lines = kafkaDirectStream.map(mapper).mapValues(valueMapper_1).reduceByKey(keyReducer).mapValues(valueMapper_2).foreachRDD(produceMessage);

ssc.start()
ssc.awaitTermination()