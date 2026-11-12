import { defineConfig } from "orval";

export default defineConfig({
  awat: {
    input: {
      target: "./openapi/openapi.yaml",
    },
    output: {
      mode: "single",
      target: "./src/services/generated/awat.ts",
      schemas: "./src/services/generated/models",
      client: "axios-functions",
      httpClient: "axios",
      override: {
        mutator: {
          path: "./src/services/http-client.ts",
          name: "customInstance",
        },
      },
    },
  },
});