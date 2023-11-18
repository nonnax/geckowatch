#!/usr/bin/env coffee
# Id$ nonnax 2023-11-12 18:08:36 +0800
{toTable:T, Filer, fromJSON} = require 'toolkit'
path = require 'path'

f = process.argv[2]

db=
Filer(f)
.read (doc) -> fromJSON doc
.value


maxTable=
Object
.keys(db)
.reduce ((acc, k)->
   row = db[k]
   acc[k] = unless k in ['date'] then row.max() else null
   acc
 ),{}

newDB=
Object
.keys(db)
.reduce ((acc, k)->
   row = db[k]
   acc[k] = unless k in ['date', 'price'] then row.scaleBy(maxTable.price) else row
   acc
),{}

Filer(f)
.write (_) -> JSON.stringify(newDB, null, 2)

console.log f
