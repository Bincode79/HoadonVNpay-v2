import type { ComponentType, ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Calendar,
  Clock,
  CreditCard,
  Download,
  Plane,
  QrCode,
  RotateCcw,
  Shield,
  User,
} from "lucide-react";
import { BANKS } from "@/data/banks";
import { displayAmount, generateBookingCode } from "@/lib/string-utils";
import { BankAccountsDialog } from "@/components/BankAccountsDialog";
import bannerLogo from "@/assets/vnpay-vietqr-banner.png";

interface AirlineInvoiceProps {
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
  passengerName?: string;
  passengerId?: string;
  passengerPhone?: string;
  passengerEmail?: string;
  flightNumber?: string;
  route?: string;
  flightDate?: string;
  flightTime?: string;
  seatClass?: string;
  bookingCode?: string;
  ticketQuantity?: string;
  unitPrice?: string;
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-md border border-[#CBD7E4] bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-2 border-b border-[#E3EAF2] px-3 py-2 dark:border-gray-700">
        <Icon className="h-4 w-4 text-[#002855] dark:text-blue-300" />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#002855] dark:text-blue-300">
          {title}
        </h2>
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}

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
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#111827] dark:text-gray-100">
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

function DetailRow({ label, value, mono = false, strong = false }: { label: string; value: string; mono?: boolean; strong?: boolean }) {
  return (
    <div className="grid grid-cols-[92px_minmax(0,1fr)] items-center gap-3 px-3 py-2">
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

export function AirlineInvoice({
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
  passengerName = "",
  passengerId = "",
  passengerPhone = "",
  passengerEmail = "",
  flightNumber = "",
  route = "",
  flightDate = "",
  flightTime = "",
  seatClass = "Economy",
  bookingCode = "",
  ticketQuantity = "1",
  unitPrice = "",
}: AirlineInvoiceProps) {
  const selectedBank = BANKS.find((b) => b.code === bankCode);
  const displayBookingCode = bookingCode || generateBookingCode();
  const qrCodeSize = Math.min(Math.max(qrSize || 150, 120), 180);
  const hasPassenger = Boolean(passengerName || passengerId || passengerPhone || passengerEmail);
  const hasFlight = Boolean(flightNumber || route || flightDate || flightTime);
  const qty = parseInt(ticketQuantity, 10) || 1;
  const amountNumber = Number((amount || "").replace(/\D/g, "")) || 0;
  const calcUnitPrice = unitPrice || (amountNumber > 0 && qty > 0 ? String(Math.round(amountNumber / qty)) : "");

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("vi-VN", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#EDF1F6] px-3 py-3 dark:bg-gray-950 sm:px-4 sm:py-3">
      <div className="w-full max-w-3xl">
        <div
          aria-busy={isLoading}
          className="invoice-print-area overflow-hidden rounded-lg border border-[#C9D4E0] bg-white shadow-[0_18px_40px_-28px_rgba(15,35,65,0.5)] dark:border-gray-700 dark:bg-gray-900"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-[#002855] via-[#004B87] to-[#002855] px-4 py-3 text-white sm:px-6">
            <div className="relative flex flex-col items-center gap-2">
              <div className="flex w-full flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
                <div>
                  <h1 className="text-base font-bold uppercase tracking-[0.08em] sm:text-lg">
                    Cổng thanh toán trực tuyến
                  </h1>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#FFD700] sm:text-xs">
                    Trung tâm Hàng không Việt Nam
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/70">
                    Civil Aviation Authority of Vietnam
                  </p>
                </div>
                <div className="rounded-sm border border-white/20 bg-white/10 px-3 py-1.5 text-center">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-white/70">Mã giao dịch</p>
                  <p className="font-mono text-sm font-bold tracking-[0.18em] text-[#FFD700]">
                    {displayBookingCode}
                  </p>
                </div>
              </div>
              <img
                src={bannerLogo}
                alt="VNPAY × VietQR"
                className="h-8 w-auto max-w-[240px] object-contain sm:h-9"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4A017]" />
          </div>

          <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3">
            {hasPassenger && (
              <Section icon={User} title="Hành khách">
                <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                  <Field label="Họ tên" value={passengerName || "—"} />
                  <Field label="CMND/CCCD" value={passengerId || "—"} mono />
                  <Field label="Điện thoại" value={passengerPhone || "—"} />
                  <Field label="Email" value={passengerEmail || "—"} />
                </div>
              </Section>
            )}

            {hasFlight && (
              <Section icon={Plane} title="Chuyến bay">
                <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                  <Field label="Chuyến bay" value={flightNumber || "—"} strong />
                  <Field label="Tuyến bay" value={route || "—"} />
                  <Field label="Ngày bay" value={formatDisplayDate(flightDate)} />
                  <Field label="Giờ bay" value={flightTime || "—"} />
                </div>
                {seatClass && (
                  <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-sm border border-[#CBD7E4] bg-[#F7F9FC] px-2 py-1 text-[11px] font-medium text-[#002855] dark:border-gray-600 dark:bg-gray-800 dark:text-blue-300">
                    <Shield className="h-3.5 w-3.5" />
                    Hạng: {seatClass}
                  </p>
                )}
              </Section>
            )}

            <Section icon={Calendar} title="Thông tin vé">
              <div className="space-y-2.5">
                <Field label="Số lượng vé" value={`${qty} vé`} strong />
                <Field label="Đơn giá" value={calcUnitPrice ? `${displayAmount(calcUnitPrice)} VNĐ` : "— VNĐ"} />
                <Field label="Tổng tiền" value={amount ? `${displayAmount(amount)} VNĐ` : "— VNĐ"} strong />
              </div>
            </Section>
          </div>

          <div className="border-t border-[#E3EAF2] p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#002855] dark:text-blue-300" />
              <h2 className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#002855] dark:text-blue-300">
                Chi tiết thanh toán
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="min-w-0 space-y-3">
                <div className="flex items-center gap-3 rounded-md border border-[#CBD7E4] bg-[#F7F9FC] px-3 py-2.5">
                  {selectedBank?.logo && (
                    <img
                      src={selectedBank.logo}
                      alt={selectedBank.name}
                      className="h-10 w-10 shrink-0 rounded-md border border-[#E3EAF2] bg-white object-contain p-1"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#64748B] dark:text-gray-400">
                      Phương thức thanh toán
                    </p>
                    <p className="truncate text-sm font-bold text-[#111827] dark:text-gray-100">
                      Chuyển khoản ngân hàng / VietQR
                    </p>
                    <p className="truncate text-[11px] text-[#64748B] dark:text-gray-400">
                      {selectedBank?.fullName || bankCode || "—"}
                    </p>
                  </div>
                  <span className="rounded-sm border border-[#C9D4E0] bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#002855] dark:border-gray-600 dark:bg-gray-800 dark:text-blue-300">
                    VietQR
                  </span>
                </div>

                <dl className="divide-y divide-[#E3EAF2] overflow-hidden rounded-md border border-[#CBD7E4] bg-white dark:border-gray-700 dark:bg-gray-800">
                  <DetailRow label="Tên tài khoản" value={accountName || "—"} />
                  <DetailRow label="Số tài khoản" value={accountNumber || "—"} mono />
                  <DetailRow
                    label="Số tiền"
                    value={amount ? `${displayAmount(amount)} VNĐ` : "— VNĐ"}
                    strong
                  />
                  <DetailRow label="Nội dung" value={message || "Thanh toan dich vu hang khong"} />
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
                <p className="mt-1 text-center font-mono text-[10px] font-medium tracking-[0.12em] text-[#002855] dark:text-blue-300">
                  {displayBookingCode}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-md border border-[#E3EAF2] bg-[#FFF8E1] px-3 py-2.5 dark:border-yellow-800/40 dark:bg-yellow-900/20">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#8D6E00] dark:text-yellow-300">
                <Shield className="h-3.5 w-3.5" />
                Lưu ý
              </p>
              <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-[11px] leading-relaxed text-[#8D6E00] dark:text-yellow-200">
                <li>Thanh toán đúng số tiền và nội dung trên hóa đơn.</li>
                <li>Mã QR có hiệu lực trong 24h từ lúc tạo.</li>
                <li>Giữ lại biên lai sau khi thanh toán.</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#E3EAF2] bg-[#F7F9FC] px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#64748B] dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[#002855] dark:text-blue-300" />
                Tạo lúc: {new Date().toLocaleString("vi-VN")}
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#002855] dark:text-blue-300" />
                Bảo mật SSL 256-bit
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
          <QrCode className="mr-1 inline h-3 w-3" />
          Trung tâm Hàng không Việt Nam - Civil Aviation Authority of Vietnam
        </p>
      </div>
    </div>
  );
}
