#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm build:server

git add apps/server/dist