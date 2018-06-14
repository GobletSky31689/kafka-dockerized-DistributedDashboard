/usr/share/zookeeper/bin/zkServer.sh start

$KAFKA_HOME/bin/kafka-server-start.sh $KAFKA_HOME/config/server.properties > /dev/null 2>&1 &

sleep 10

# Create Input and Output Topics
$KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic input

$KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic output

$KAFKA_HOME/bin/kafka-server-stop.sh

/usr/share/zookeeper/bin/zkServer.sh stop