import { toast } from "sonner";

export interface VietQRRequest {
  accountNo: string;
  accountName: string;
  acqId: string;
  amount?: string;
  addInfo?: string;
  format?: string;
  template?: string;
}

export interface VietQRResponse {
  code: string;
  desc: string;
  data?: {
    qrCodeURL?: string;
    qrCode?: string;
    qrDataURL?: string;
  };
}

const API_BASE_URL = "https://api.vietqr.io/v2/generate";

const CLIENT_ID = import.meta.env.VITE_VIETQR_CLIENT_ID as string | undefined;
const API_KEY = import.meta.env.VITE_VIETQR_API_KEY as string | undefined;

export async function generateVietQR(request: VietQRRequest): Promise<VietQRResponse> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (CLIENT_ID && API_KEY) {
      headers["x-client-id"] = CLIENT_ID;
      headers["x-api-key"] = API_KEY;
    }

    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: VietQRResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating VietQR:", error);
    throw error;
  }
}

export function createVietQRRequest(
  bankCode: string,
  accountNumber: string,
  accountName: string,
  amount?: string,
  message?: string
): VietQRRequest {
  // QR không có số tiền cố định và nội dung
  // Người scan tự nhập số tiền và nội dung trên app ngân hàng
  return {
    accountNo: accountNumber,
    accountName: accountName.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    acqId: bankCode,
    amount: "",
    addInfo: "",
    format: "text",
    template: "compact",
  };
}

// Hàm tạo URL hình ảnh QR từ Quicklink VietQR
export function getVietQRImageUrl(
  bankCode: string,
  accountNumber: string,
  accountName: string,
  amount?: string,
  message?: string,
  template: string = "compact"
): string {
  const bank = bankCode;
  const acc = accountNumber;
  // QR không có số tiền cố định và nội dung
  // Người scan tự nhập số tiền và nội dung trên app ngân hàng
  return `https://img.vietqr.io/image/${bank}-${acc}-${template}.jpg`;
}

export async function generateVietQRWithFallback(
  bankCode: string,
  accountNumber: string,
  accountName: string,
  amount?: string,
  message?: string
): Promise<string> {
  const request = createVietQRRequest(bankCode, accountNumber, accountName, amount, message);

  try {
    const response = await generateVietQR(request);

    if (response.code === "00" && response.data?.qrCode) {
      return response.data.qrCode;
    }

    if (response.desc) {
      toast.warning(response.desc);
    }

    throw new Error(response.desc || "Failed to generate QR");
  } catch (error) {
    console.error("VietQR API failed, using local fallback:", error);
    throw error;
  }
}
