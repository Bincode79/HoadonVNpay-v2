import { describe, it, expect } from "vitest";
import { toUpperCaseNoAccent, formatAmount, displayAmount } from "./string-utils";

describe("toUpperCaseNoAccent", () => {
  it("chuyển chữ thường có dấu thành chữ hoa không dấu", () => {
    expect(toUpperCaseNoAccent("Nguyễn Văn A")).toBe("NGUYEN VAN A");
  });

  it("giữ nguyên ký tự không dấu", () => {
    expect(toUpperCaseNoAccent("Hello World 123")).toBe("HELLO WORLD 123");
  });

  it("xử lý tiếng Việt đầy đủ", () => {
    expect(toUpperCaseNoAccent("Trần Thị Bích Đào")).toBe("TRAN THI BICH DAO");
  });

  it("xử lý chuỗi rỗng", () => {
    expect(toUpperCaseNoAccent("")).toBe("");
  });
});

describe("formatAmount", () => {
  it("loại bỏ ký tự không phải số", () => {
    expect(formatAmount("123abc456")).toBe("123456");
  });

  it("giữ nguyên số", () => {
    expect(formatAmount("500000")).toBe("500000");
  });

  it("xử lý chuỗi rỗng", () => {
    expect(formatAmount("")).toBe("");
  });
});

describe("displayAmount", () => {
  it("định dạng số theo locale vi-VN", () => {
    expect(displayAmount("1000000")).toBe("1.000.000");
  });

  it("xử lý số nhỏ", () => {
    expect(displayAmount("500")).toBe("500");
  });

  it("xử lý chuỗi rỗng", () => {
    expect(displayAmount("")).toBe("");
  });
});