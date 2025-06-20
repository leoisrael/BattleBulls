#!/bin/sh
cd "$(dirname "$0")" || exit
/usr/bin/node monitor.js >> monitor.log 2>&1
