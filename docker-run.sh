#!/bin/bash

if [ "$1" = "" ] || [ "$2" = "" ]; then
  echo $0: usage: $0 path-to-local-reveal-clone path-to-slides-dir
  exit
fi

if [ ! -e $1 ]; then
  echo $0: Local reveal clone does not exist: $1
  exit
fi

if [ ! -e $2 ]; then
  echo $0: Slides directory does not exist: $2
  exit
fi

docker run -v $1:/home/user/reveal.js -v $2:/home/user/reveal.js/slides/ -p 8000:8000 -p 35729:35729 -it --rm rscale/node /bin/bash
