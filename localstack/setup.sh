#!/bin/bash

awslocal s3 mb s3://configs
awslocal s3 cp /var/lib/localstack/configs s3://configs --recursive
