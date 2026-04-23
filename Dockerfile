# Build the test app with ngc-rs, compiled inside Docker from a chosen
# ngc-rs workspace (main checkout or any worktree).
#
# Build context is this directory (the test app). The ngc-rs workspace is
# provided via a named BuildKit build-context called `workspace`. Invoke
# via the helper:
#
#   WORKSPACE=/path/to/ngc-rs-worktree ./docker-build.sh
#
# Or manually:
#
#   docker build \
#     --build-context workspace=/path/to/ngc-rs-worktree \
#     -f Dockerfile -t ngc-rs-test .

# Stage 1 — compile ngc-rs from the selected workspace.
FROM rust:1-slim AS rust-builder
WORKDIR /ngc-rs
COPY --from=workspace Cargo.toml Cargo.lock ./
COPY --from=workspace crates/ ./crates/
RUN cargo build --release --bin ngc-rs

# Stage 2 — build the Angular test project with ngc-rs.
FROM debian:trixie-slim AS build
RUN apt-get update \
  && apt-get install -y --no-install-recommends nodejs npm ca-certificates \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=rust-builder /ngc-rs/target/release/ngc-rs /usr/local/bin/ngc-rs
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN ngc-rs build --project tsconfig.app.json --configuration production

# Stage 3 — serve.
FROM nginx:1.29-alpine-slim
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
  && chown -R appuser:appgroup /usr/share/nginx/html \
  && chown -R appuser:appgroup /var/cache/nginx \
  && chown -R appuser:appgroup /var/log/nginx \
  && touch /var/run/nginx.pid && chown appuser:appgroup /var/run/nginx.pid
RUN rm -f /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/test-ng-project/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER appuser
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
