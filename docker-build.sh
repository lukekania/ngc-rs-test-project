#!/usr/bin/env bash
# Build the Docker image that compiles ngc-rs from a chosen workspace
# (main checkout or any git worktree) and runs `ngc-rs build` against the
# test app.
#
# Usage:
#   ./docker-build.sh            # build and run on :8080
#   ./docker-build.sh --no-run   # just build the image
#   PORT=9000 ./docker-build.sh  # override host port
#
# The ngc-rs workspace is selected via the WORKSPACE env var. If unset,
# defaults to the current working directory (so you can `cd` into a
# worktree and invoke this script by absolute path).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="${WORKSPACE:-$PWD}"
IMAGE="ngc-rs-test"
PORT="${PORT:-8080}"

if [[ ! -f "$WORKSPACE/Cargo.toml" || ! -d "$WORKSPACE/crates" ]]; then
  echo "error: \$WORKSPACE ($WORKSPACE) does not look like an ngc-rs workspace" >&2
  echo "       set WORKSPACE to a worktree path, e.g.:" >&2
  echo "         WORKSPACE=~/Coding/Private/ngc-rs-scss $0" >&2
  exit 1
fi

echo "==> workspace: $WORKSPACE"
echo "==> docker build --build-context workspace=$WORKSPACE -f $SCRIPT_DIR/Dockerfile -t $IMAGE $SCRIPT_DIR"
docker build \
  --build-context "workspace=$WORKSPACE" \
  -f "$SCRIPT_DIR/Dockerfile" \
  -t "$IMAGE" \
  "$SCRIPT_DIR"

if [[ "${1:-}" == "--no-run" ]]; then
  echo "==> image built; skipping run"
  exit 0
fi

echo "==> docker run --rm -p ${PORT}:8080 $IMAGE"
echo "    open http://localhost:${PORT}/"
docker run --rm -p "${PORT}:8080" "$IMAGE"
