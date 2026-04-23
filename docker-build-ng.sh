#!/usr/bin/env bash
# Build the test app with the upstream Angular CLI (`ng build`) in a Docker image, then run it.
# Runs on port 8081 by default so it can run in parallel with the ngc-rs container on 8080.
#
# Usage:
#   ./docker-build-ng.sh            # build and run on :8081
#   ./docker-build-ng.sh --no-run   # just build the image
#   PORT=9000 ./docker-build-ng.sh  # override host port
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
IMAGE="ng-test"
PORT="${PORT:-8081}"

echo "==> docker build -f test/test-ng-project/Dockerfile.ng -t $IMAGE (context=$REPO_ROOT)"
docker build -f "$SCRIPT_DIR/Dockerfile.ng" -t "$IMAGE" "$REPO_ROOT"

if [[ "${1:-}" == "--no-run" ]]; then
  echo "==> image built; skipping run"
  exit 0
fi

echo "==> docker run --rm -p ${PORT}:8080 $IMAGE"
echo "    open http://localhost:${PORT}/"
docker run --rm -p "${PORT}:8080" "$IMAGE"
