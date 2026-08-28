import "@testing-library/jest-dom/jest-globals";

import { TextEncoder, TextDecoder } from "util";

Object.defineProperty(globalThis, "TextEncoder", {
  value: TextEncoder,
});

Object.defineProperty(globalThis, "TextDecoder", {
  value: TextDecoder,
});