import { it, expect } from "vitest";
import { buildDocument } from "../src/export";
import { add, initial } from "../src/engine";
it("offline summary includes destination and fixed specification", () => {
  const doc = buildDocument(initial);
  expect(doc).toContain("$33,020");
  expect(doc).toContain("6-speed manual");
  expect(doc).toContain("WR Blue Pearl");
  expect(doc).toContain("Gold BBS");
});
it("unknown prices remain excluded in downloaded summary", () => {
  const doc = buildDocument(add(initial, "spt_catback"));
  expect(doc).toContain("Known subtotal");
  expect(doc).toContain("Full total unknown");
  expect(doc).toContain("Historical price unverified");
});
it("download counts packages once and preserves installation exclusions", () => {
  const doc = buildDocument(
    add(add(add(initial, "alarm"), "peg_2b"), "hood_protector"),
  );
  expect(doc).toContain("$33,511");
  expect(doc).toContain("Installation charges");
  expect(doc).not.toContain("Security system upgrade kit, STI</td>");
});
