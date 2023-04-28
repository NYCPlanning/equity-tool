#!/bin/bash

if [[ -z "$ETL_TAG" ]]; then
    echo "Missing ETL_TAG environment variable" 1>&2
    exit 1
fi

awslocal s3 mb s3://configs/$ETL_TAG
awslocal s3 cp /var/lib/localstack/configs/$ETL_TAG s3://configs/$ETL_TAG --recursive
