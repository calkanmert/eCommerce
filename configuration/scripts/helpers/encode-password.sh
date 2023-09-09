#!/bin/bash

PASSWORD=$1
ENCODED="$(echo $PASSWORD | sed 's/#/%23/g; s/</%3C/g')"

echo $ENCODED
