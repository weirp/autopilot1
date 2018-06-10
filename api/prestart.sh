#!/bin/sh
while [[ "$(curl -s http://${CONSUL_HOST}:8500/v1/health/service/db | grep passing)" == "" ]]
do
    echo "db is not yet healthly..."
#    /usr/local/bin/consul-template -consul-addr=consul:8500 -template "/app/props.ctmpl:/app/props.out1"
    sleep 5
done

echo "db is healthly, moving on..."
echo "BANK_CODE is ${BANK_CODE}"

# should do similar checks for rabbit and kafka

/usr/local/bin/consul-template -consul-addr=consul:8500 -template "/app/props.ctmpl:/app/props.out"
