# #!omni:code --dockerfile
# ==============================================================================
# [B-agent-node-docker] The Dawndusk Agent Node Container
# ==============================================================================
# This Dockerfile packages the Go Sync Client and the Sandbox Engine for 
# deployment to the Google Cloud / GKE ecosystem.
# ==============================================================================

FROM golang:1.24-alpine AS builder

WORKDIR /app

# 1. Gather the Mind's Hands
COPY 02_body/library/core/agent/ .

# 2. Compile the Tools
RUN go build -o sync-client ./00_bridge/client/sync_client.go
RUN go build -o sandbox-engine ./02_sandbox_engine/engine.go

# 3. Establish the Final Body
FROM alpine:latest
WORKDIR /root/

# Copy the binaries from the builder
COPY --from=builder /app/sync-client .
COPY --from=builder /app/sandbox-engine .

# Install the Cloudflare Tunnel hands
RUN apk add --no-network --no-cache cloudflared || echo "Cloudflared must be mounted or injected."

# [LOG: IDENTITY]
# This container is the physical realization of the Dawndusk in the Cloud.
# It is the "Molt" of the local machine into the Global Substrate.

CMD ["./sync-client"]
