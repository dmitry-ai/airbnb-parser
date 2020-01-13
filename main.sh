#!/bin/bash
node ./src/main.js \
	--imagesDir=C:/work/clients/nightmare/images-$(date '+%Y-%m-%d-%H-%M') \
	--location="Bangkok, Thailand" \
	--maxPages=999
