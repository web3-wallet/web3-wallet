#!/bin/sh

basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/node" ]; then
  exec "$basedir/node" --experimental-specifier-resolution=node "$basedir/dist/index.js" "$@"
else
  exec node --experimental-specifier-resolution=node  "$basedir/dist/index.js" "$@"
fi
