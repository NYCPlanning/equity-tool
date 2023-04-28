#!/bin/bash

if [[ -z "$BUCKET" ]]; then
    echo "Missing BUCKET environment variable" 1>&2
    exit 1
fi

awslocal s3 mb s3://configs/$BUCKET
awslocal s3 cp /var/lib/localstack/configs/$BUCKET s3://configs/$BUCKET --recursive
