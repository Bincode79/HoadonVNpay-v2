import { describe, it, expect } from "vitest";
import { createVietQRRequest } from "./vietqr";

describe("createVietQRRequest", () => {
  it("tạo request đúng định dạng", () => {
    const result = createVietQRRequest("970422", "123456789", "NGUYEN VAN A", "500000", "Thanh toan");

    expect(result.accountNo).toBe("123456789");
    expect(result.accountName).toBe("NGUYEN VAN A");
    expect(result.acqId).toBe("970422");
    expect(result.amount).toBe("");
    expect(result.addInfo).toBe("");
    expect(result.format).toBe("text");
    expect(result.template).toBe("compact");
  });

  it("không required amount và message", () => {
    const result = createVietQRRequest("970422", "123456789", "NGUYEN VAN A");

    expect(result.accountNo).toBe("123456789");
    expect(result.amount).toBe("");
    expect(result.addInfo).toBe("");
  });

  it("chuyển tên thành chữ hoa không dấu", () => {
    const result = createVietQRRequest("970422", "123456789", "Nguyễn Văn A");

    expect(result.accountName).toBe("NGUYEN VAN A");
  });
});