#!/usr/bin/env bash
# Id$ nonnax 2023-11-18 11:18:06 +0800
cat coins.txt | xargs -n2 ./market.coffee && cat json.txt | xargs ./scale.coffee
http-server &
