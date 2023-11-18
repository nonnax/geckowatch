#!/usr/bin/env bash
# Id$ nonnax 2023-11-18 11:18:06 +0800
cat coins.txt | xargs -n1 ./market.coffee && fd . data | xargs -n1 ./scale.coffee
