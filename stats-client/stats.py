#!/usr/bin/env python

import sys, json, time
import psutil as ps
import kafka

if sys.version_info[0] < 3:
	from urllib2 import urlopen
else:
	from urllib.request import urlopen

if len(sys.argv) != 3:
	print("Usage: stats.py <id-server host:port> <freq>")
	sys.exit(0)

id_server = sys.argv[1]
freq = int(sys.argv[2])

#login and get uuid
try:
	data = urlopen('http://' + id_server + '/login').read()
	server_config = json.loads(data.decode('utf-8'))
except Exception as e:
	print('Error: Id Server: ' + str(e))
	sys.exit(0)

print(server_config)

bootstrap_servers = server_config['bootstrap_servers']
my_uuid = server_config['uuid']
topic = server_config['topic']


# Create a kafka producer connection
try:
	kafkaProducer = kafka.KafkaProducer(bootstrap_servers = [bootstrap_servers], acks='all')
except kafka.errors.KafkaError as ke:
	print('Error: Kafka Error: ' + str(ke))
	sys.exit(0)

try:
	while True:
		data = {}
		data['uuid'] = my_uuid
		data['cpu'] = ps.cpu_percent()
		data['mem'] = ps.virtual_memory()[2]
		kafkaProducer.send(topic, json.dumps(data).encode('utf-8'))	
		kafkaProducer.flush()	
		time.sleep(freq)
		print('.'),
except KeyboardInterrupt as ki:
	sys.exit(0)





