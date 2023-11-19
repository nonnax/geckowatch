#!/usr/bin/env coffee
# Id$ nonnax 2023-11-12 17:01:59 +0800
axios = require 'axios'
{toTable: T, Filer} = require 'toolkit'
{DataFrame} = require 'dataframe-js'

marketGen=(coin)->
 (days = 1)->
    url="""
     https://api.coingecko.com/api/v3/coins/#{coin}/market_chart?
     vs_currency=php
     &days=#{days}
     &interval=daily
    """
    res = await axios.get url.replace(/\n+/, '')
    res.data

[coin,days] = process.argv[2..3]

dataDays = marketGen(coin)

data = dataDays(+days)

data
.then(
   (e)->
      e.prices.map ([date, pr])->
         v={
            date: Number(date)
            price: pr,
            market_cap: e.market_caps.find( ([vdate, _])-> vdate is date)[1],
            total_volume: e.total_volumes.find( ([vdate, _])-> vdate is date)[1]
         }
         v.turnover=v.total_volume/v.market_cap
         v
)
.then (res) ->
   df2=new DataFrame(res, Object.keys res[0])
   df2.toDict()
.then (res)->
   Filer("data/#{coin}.json")
   .write (_d) -> JSON.stringify(res, null, 2)


console.log coin
