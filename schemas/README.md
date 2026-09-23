# Example JSON Schemas

These Draft 2020-12 schemas translate the research report's illustrative contracts into machine-readable starting points. They are **proposals**, not approved customer contracts or a deployed API. `tenantId` is intentionally absent from the create-request body: the server derives tenant context from authenticated identity and authorization.

Publishing a scenario requires checks beyond JSON Schema: capability/handler registration, linked policy existence, workflow reachability and actor resolution, accounting/integration route validity, effective-date conflicts, and definition hash. See `docs/12-platform-rules.md` and `docs/13-data-contracts.md`.
