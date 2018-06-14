FROM python:2.7-alpine

MAINTAINER Ujjawal Garg <ujjawal.1224@gmail.com>

ENV DEBIAN_FRONTEND noninteractive

RUN pip install kafka-python==1.4.2

RUN apk add --update \
    build-base \
    linux-headers \
  && rm -rf /var/cache/apk/*

RUN pip install psutil==5.4.5

WORKDIR /app

COPY stats.py ./stats.py

CMD ["python", "stats.py", "dashboard:8080", "3"]
