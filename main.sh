#!/bin/bash
node ./src/main.js \
	--imagesDir=C:/work/clients/flat0/parser/images-$(date '+%Y-%m-%d-%H-%M') \
	--location="Bangkok, Thailand" \
	--maxPages=999
