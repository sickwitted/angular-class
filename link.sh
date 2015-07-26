#!/bin/bash
LIBDIR=$(pwd)/lib/
NODEMODULES=$(pwd)/node_modules/

for MODULE in $(ls $LIBDIR)
do
  echo "clearing $NODEMODULES$MODULE"
  rm $NODEMODULES$MODULE
  echo "linking $LIBDIR$MODULE/ --> $NODEMODULES$MODULE"
  ln -s $LIBDIR$MODULE/ $NODEMODULES$MODULE
done