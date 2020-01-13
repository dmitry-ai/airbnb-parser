#!/bin/bash
node ./src/main.js \
	--imagesDir=C:/work/clients/nightmare/images-$(date '+%Y-%m-%d) \
	--location="Bangkok, Thailand" \
	--maxPages=3
