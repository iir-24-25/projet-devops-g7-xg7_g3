FROM docker.elastic.co/elasticsearch/elasticsearch:8.15.5

ENV ELASTIC_PASSWORD="BIT@kal@2002" \
    xpack.security.enabled=true \
    discovery.type=single-node