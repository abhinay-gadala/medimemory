---
name: Demo reliability
description: Product demos should remain usable when browser permissions, network services, or AI providers are unavailable.
---

For a time-boxed product demo, keep a deterministic structured-data path as the source of truth and treat camera, microphone, network, and AI calls as optional enhancements with visible fallbacks.

**Why:** A fragile external dependency can interrupt the main story at the exact moment a judge is evaluating the product.

**How to apply:** Design the primary happy path so it completes locally, then add permission-safe capture and retrieval enhancements around that path.