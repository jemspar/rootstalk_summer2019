#!/bin/bash
cd ~/Projects/rootstalk_summer2019
perl -i.bak -lpe 'BEGIN { sub inc { my ($num) = @_; ++$num } } s/(build = )(\d+)/$1 . (inc($2))/eg' config.toml
docker image build -t rootstalk-update .
docker login
docker tag rootstalk-update mcfatem/rootstalk:latest
docker push mcfatem/rootstalk:latest
