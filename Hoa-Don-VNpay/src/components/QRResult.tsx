import { useState } from "react";
import {
  Check,
  CreditCard,
  Download,
  Landmark,
  Plane,
  QrCode,
  RotateCcw,
  Shield,
  Smartphone,
  User,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react";
import { BANKS } from "@/data/banks";
import { PAYMENT_METHODS } from "@/data/payment-methods";
import { displayAmount } from "@/lib/string-utils";
import { BankAccountsDialog } from "@/components/BankAccountsDialog";
import bannerLogo from "@/assets/vnpay-vietqr-banner.png";

interface QRResultProps {
  bankCode: string;
  accountNumber: string;
  accountName: string;
  amount: string;
  message: string;
  qrValue: string;
  qrData: string;
  useLocalQR: boolean;
  isLoading: boolean;
  logoSize: number;
  qrSize: number;
  onReset: () => void;
  onToggleInvoiceView: () => void;
  passengerName?: string;
  passengerId?: string;
  passengerPhone?: string;
  passengerEmail?: string;
  flightNumber?: string;
  route?: string;
  flightDate?: string;
  flightTime?: string;
  seatClass?: string;
  ticketQuantity?: string;
  unitPrice?: string;
}

const METHOD_ICONS = {
  atm: CreditCard,
  "atm-vnpay": Smartphone,
  "credit-onepay": CreditCard,
  "credit-vnpay": CreditCard,
  transfer: Landmark,
} as const;

function Field({
  label,
  value,
  mono = false,
  strong = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#64748B] dark:text-gray-400">
        {label}
      </p>
      <p
        className={`mt-0.5 truncate text-xs text-[#1F2937] dark:text-gray-100 ${
          mono ? "font-mono tabular-nums" : "font-normal"
        } ${strong ? "text-sm font-bold text-[#002855] dark:text-blue-300" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
  strong = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
  strong?: boolean;
}) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 px-3 py-2.5">
      <dt className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#64748B] dark:text-gray-400">
        {label}
      </dt>
      <dd
        className={`truncate text-xs text-[#1F2937] dark:text-gray-100 ${
          mono ? "font-mono tabular-nums" : "font-normal"
        } ${strong ? "text-sm font-bold text-[#002855] dark:text-blue-300" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

export function QRResult({
  bankCode,
  accountNumber,
  accountName,
  amount,
  message,
  qrValue,
  qrData,
  useLocalQR,
  isLoading,
  qrSize,
  onReset,
  onToggleInvoiceView,
  passengerName = "",
  passengerId = "",
  passengerPhone = "",
  passengerEmail = "",
  flightNumber = "",
  route = "",
  flightDate = "",
  flightTime = "",
  seatClass = "Economy",
  ticketQuantity = "1",
  unitPrice = "",
}: QRResultProps) {
  const formatInvoiceDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
  };
  const [selectedMethod, setSelectedMethod] = useState("transfer");
  const selectedBank = BANKS.find((b) => b.code === bankCode);
  const selectedPaymentMethod =
    PAYMENT_METHODS.find((method) => method.id === selectedMethod) ?? PAYMENT_METHODS[PAYMENT_METHODS.length - 1];
  const qrCodeSize = Math.min(Math.max(qrSize || 88, 72), 96);

  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#EDF1F6] px-3 py-3 dark:bg-gray-950 sm:px-4 sm:py-3">
      <div className="w-full max-w-2xl">
        <div
          aria-busy={isLoading}
          className="overflow-hidden rounded-lg border border-[#C9D4E0] bg-white shadow-[0_18px_40px_-28px_rgba(15,35,65,0.5)] dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-[#002855] via-[#004B87] to-[#002855] px-4 py-3 text-center sm:px-6">
            <div className="relative flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="text-left">
                  <h1 className="text-base font-bold uppercase tracking-[0.08em] text-white sm:text-lg">
                    Cổng thanh toán trực tuyến
                  </h1>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#FFD700] sm:text-xs">
                    Trung tâm Hàng không Việt Nam
                  </p>
                </div>
              </div>
              <img
                src={bannerLogo}
                alt="VNPAY × VietQR"
                className="mt-1 h-8 w-auto max-w-[260px] object-contain sm:h-9"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A017]" />
          </div>

          <div className="border-b border-[#E3EAF2] px-3 py-3 sm:px-5">
            <div className="mb-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#64748B] dark:text-gray-400">
                  Phương thức thanh toán
                </p>
                <h2 className="mt-0.5 text-sm font-bold text-[#111827] dark:text-gray-100">
                  Chọn kênh thanh toán phù hợp
                </h2>
              </div>
              <span className="rounded-sm border border-[#C9D4E0] bg-[#F7F9FC] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#002855] dark:border-gray-600 dark:bg-gray-800 dark:text-blue-300">
                VietQR
              </span>
            </div>

            <div role="radiogroup" aria-label="Phương thức thanh toán" className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {PAYMENT_METHODS.map((method) => {
                const isSelected = selectedMethod === method.id;
                const Icon = METHOD_ICONS[method.id as keyof typeof METHOD_ICONS] ?? CreditCard;

                return (
                  <button
                    key={method.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    disabled={!method.available}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "border-[#005BAC] bg-[#F2F7FC] shadow-[inset_3px_0_0_#005BAC] dark:border-blue-400 dark:bg-blue-900/20"
                        : "border-[#CBD7E4] bg-white hover:border-[#9BB8D8] dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-500"
                    } ${method.available ? "cursor-pointer" : "cursor-not-allowed opacity-55"}`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-[#005BAC] bg-[#005BAC] text-white dark:border-blue-400 dark:bg-blue-500"
                          : "border-[#94A3B8] bg-white dark:border-gray-500 dark:bg-gray-700"
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF3F8] text-[#002855] dark:bg-gray-800 dark:text-blue-300">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-bold text-[#111827] dark:text-gray-100">
                        {method.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-[#64748B] dark:text-gray-400">
                        {method.note}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedPaymentMethod.id === "transfer" ? (
            <div>
              <div className="border-b border-[#E3EAF2] bg-[#F7F9FC] px-3 py-2.5 sm:px-5">
                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-[#002855] dark:text-blue-300" />
                  <p className="text-[11px] leading-relaxed text-[#475569] dark:text-gray-400">
                    Sau khi nhận được thông tin đặt dịch vụ, nhân viên chăm sóc khách hàng sẽ liên hệ để xác nhận và hướng dẫn thủ tục thanh toán.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 p-3 sm:p-5 md:grid-cols-[minmax(0,1fr)_180px]">
                <div className="min-w-0 space-y-3">
                  <div className="flex items-center gap-3 rounded-md border border-[#CBD7E4] bg-[#F7F9FC] px-3 py-3">
                    {selectedBank?.logo && (
                      <img
                        src={selectedBank.logo}
                        alt={selectedBank.name}
                        className="h-10 w-10 shrink-0 rounded-md border border-[#E3EAF2] bg-white object-contain p-1"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#64748B] dark:text-gray-400">
                        Ngân hàng thụ hưởng
                      </p>
                      <p className="truncate text-sm font-medium text-[#111827] dark:text-gray-100">
                        {selectedBank?.fullName || "—"}
                      </p>
                    </div>
                  </div>

                  <dl className="divide-y divide-[#E3EAF2] overflow-hidden rounded-md border border-[#CBD7E4] bg-white dark:border-gray-700 dark:bg-gray-800">
                    <DetailRow label="Tên tài khoản" value={accountName || "—"} />
                    <DetailRow label="Số tài khoản" value={accountNumber || "—"} mono />
                    <DetailRow
                      label="Số tiền"
                      value={amount ? `${displayAmount(amount)} VNĐ` : "— VNĐ"}
                      strong
                    />
                    <DetailRow label="Nội dung" value={message || "—"} />
                  </dl>

                  <BankAccountsDialog
                    currentBankCode={bankCode}
                    currentAccountNumber={accountNumber}
                    currentAccountName={accountName}
                  />
                </div>

                <div className="flex flex-col items-center justify-center rounded-md border border-[#CBD7E4] bg-[#F7F9FC] p-3">
                  <div className="relative w-32">
                    <img src="/qr-frame.png" alt="QR Frame" className="h-auto w-full object-contain" />
                    <div className="absolute left-[9%] right-[9%] top-[20%] flex items-center justify-center">
                      <QRCodeSVG
                        value={useLocalQR ? qrValue : qrData || qrValue}
                        size={qrCodeSize}
                        level="H"
                        fgColor="#000000"
                        bgColor="#ffffff"
                        className="object-contain"
                        includeMargin={false}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-center text-[11px] font-normal text-[#111827] dark:text-gray-200">
                    Quét mã QR để thanh toán
                  </p>
                  <p className="text-center text-[10px] leading-relaxed text-[#64748B] dark:text-gray-400">
                    Dùng ứng dụng ngân hàng hoặc VNPAY/VietQR
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-md bg-[#EEF3F8] text-[#002855] dark:bg-gray-800 dark:text-blue-300">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111827] dark:text-gray-100">
                {selectedPaymentMethod.label}
              </h3>
              <p className="mt-1 text-xs text-[#64748B] dark:text-gray-400">
                {selectedPaymentMethod.note}. Phương thức này chưa khả dụng trong phiên bản VietQR hiện tại.
              </p>
              <button
                type="button"
                onClick={() => setSelectedMethod("transfer")}
                className="mt-4 rounded-md bg-[#002855] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#004B87] dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Chọn chuyển khoản ngân hàng
              </button>
            </div>
          )}

          {(passengerName || passengerId || passengerPhone || passengerEmail || flightNumber || route || flightDate || flightTime || seatClass || ticketQuantity || unitPrice) && (
            <div className="border-t border-[#E3EAF2] bg-white p-3 sm:p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-[#002855] dark:text-blue-300" />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#002855] dark:text-blue-300">
                  Thông tin hành khách & chuyến bay
                </h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {passengerName && (
                  <Field label="Họ tên" value={passengerName} />
                )}
                {passengerId && (
                  <Field label="CMND/CCCD" value={passengerId} mono />
                )}
                {passengerPhone && (
                  <Field label="Điện thoại" value={passengerPhone} />
                )}
                {passengerEmail && (
                  <Field label="Email" value={passengerEmail} />
                )}
                {flightNumber && (
                  <Field label="Chuyến bay" value={flightNumber} strong />
                )}
                {route && (
                  <Field label="Tuyến bay" value={route} />
                )}
                {flightDate && (
                  <Field label="Ngày bay" value={formatInvoiceDate(flightDate)} />
                )}
                {flightTime && (
                  <Field label="Giờ bay" value={flightTime} />
                )}
                {seatClass && (
                  <Field label="Hạng" value={seatClass} />
                )}
                {ticketQuantity && (
                  <Field label="Số lượng vé" value={`${ticketQuantity} vé`} strong />
                )}
                {unitPrice && (
                  <Field label="Đơn giá" value={`${unitPrice} VNĐ`} />
                )}
                {amount && (
                  <Field label="Tổng tiền" value={`${amount} VNĐ`} strong />
                )}
              </div>
              <button
                type="button"
                onClick={onToggleInvoiceView}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#CBD7E4] bg-[#F7F9FC] px-3 py-1.5 text-xs font-medium text-[#002855] transition-colors hover:bg-[#EEF3F8] dark:border-gray-600 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
              >
                <RotateCcw className="h-3 w-3" /> Xem mẫu hóa đơn hàng không
              </button>
            </div>
          )}

          <div className="flex flex-col gap-3 border-t border-[#E3EAF2] bg-[#F7F9FC] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#64748B] dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#002855] dark:text-blue-300" />
                Bảo mật SSL 256-bit
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Mã QR có hiệu lực trong 24h
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="no-print inline-flex items-center gap-1.5 rounded-md bg-[#002855] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#004B87] dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                <Download className="h-3.5 w-3.5" />
                In / Lưu PDF
              </button>
              <button
                type="button"
                onClick={onReset}
                className="no-print inline-flex items-center gap-1.5 rounded-md border border-[#C9D4E0] bg-white px-3 py-2 text-xs font-semibold text-[#334155] transition-colors hover:bg-[#EEF3F8] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Tạo mới
              </button>
            </div>
          </div>
        </div>

        <p className="mt-2 text-center text-[10px] uppercase tracking-[0.14em] text-[#64748B] dark:text-gray-500">
          Trung tâm Hàng không Việt Nam - Civil Aviation Authority of Vietnam
        </p>
      </div>
    </div>
  );
}
