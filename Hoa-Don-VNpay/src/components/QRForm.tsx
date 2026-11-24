import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { QrCode, Loader2, FileText, Plane } from "lucide-react";
import { BANKS } from "@/data/banks";
import { toUpperCaseNoAccent, formatAmount, displayAmount } from "@/lib/string-utils";
import vnpayLogo from "@/assets/vnpay-logo-hd.png";
import vietqrLogo from "@/assets/vietqr-logo.png";
import bannerLogo from "@/assets/vnpay-vietqr-banner.png";

const LOGO_SIZES = [20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80];
const MIN_ACCOUNT_LENGTH = 1;
const MAX_ACCOUNT_LENGTH = 16;

interface QRFormProps {
  bankCode: string;
  setBankCode: (v: string) => void;
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  accountName: string;
  setAccountName: (v: string) => void;
  amount: string;
  setAmount: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  bookingCode: string;
  setBookingCode: (v: string) => void;
  passengerName: string;
  setPassengerName: (v: string) => void;
  passengerId: string;
  setPassengerId: (v: string) => void;
  passengerPhone: string;
  setPassengerPhone: (v: string) => void;
  passengerEmail: string;
  setPassengerEmail: (v: string) => void;
  flightNumber: string;
  setFlightNumber: (v: string) => void;
  route: string;
  setRoute: (v: string) => void;
  flightDate: string;
  setFlightDate: (v: string) => void;
  flightTime: string;
  setFlightTime: (v: string) => void;
  seatClass: string;
  setSeatClass: (v: string) => void;
  ticketQuantity: string;
  setTicketQuantity: (v: string) => void;
  unitPrice: string;
  setUnitPrice: (v: string) => void;
  logoSize: number;
  setLogoSize: (v: number) => void;
  isLoading: boolean;
  onGenerate: () => void;
  qrValue: string;
  onToggleInvoiceView?: () => void;
}

export function QRForm({
  bankCode, setBankCode,
  accountNumber, setAccountNumber,
  accountName, setAccountName,
  amount, setAmount,
  message, setMessage,
  bookingCode, setBookingCode,
  passengerName, setPassengerName,
  passengerId, setPassengerId,
  passengerPhone, setPassengerPhone,
  passengerEmail, setPassengerEmail,
  flightNumber, setFlightNumber,
  route, setRoute,
  flightDate, setFlightDate,
  flightTime, setFlightTime,
  seatClass, setSeatClass,
  ticketQuantity, setTicketQuantity,
  unitPrice, setUnitPrice,
  logoSize, setLogoSize,
  isLoading, onGenerate,
  qrValue,
  onToggleInvoiceView,
}: QRFormProps) {
  const selectedBank = useMemo(() => BANKS.find((b) => b.code === bankCode), [bankCode]);

  const accValid = accountNumber.length >= MIN_ACCOUNT_LENGTH && accountNumber.length <= MAX_ACCOUNT_LENGTH;
  const canGenerate = !!bankCode && accValid && !isLoading && !!accountNumber;

  const showQRPreview = !!bankCode && !!accountNumber;

  return (
    <div className="min-h-[180vh] flex flex-col bg-gradient-to-b from-[#E8EDF4] to-[#F5F6FA] dark:from-gray-900 dark:to-gray-900 items-center py-8 sm:py-10 px-4 sm:px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-[#DCE6F2] dark:border-gray-700 overflow-hidden shadow-[0_22px_50px_-28px_rgba(15,35,65,0.35)]">
          <div className="bg-white dark:bg-gray-800 pt-3 pb-2 px-4 text-center">
            <div className="flex flex-col items-center justify-center gap-0.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#005BAC] dark:text-blue-300">CỔNG THANH TOÁN TRỰC TUYẾN HÀNG KHÔNG VIỆT NAM - TRUNG TÂM HÀNG KHÔNG VIỆT NAM</h1>
              <img src={bannerLogo} alt="VNPAY × VietQR" className="object-contain" style={{ width: "100%", maxWidth: 400, height: 90 }} />
            </div>
          </div>
          <div className="pb-0 px-2 sm:px-3">
            <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-[#E6EEF7] dark:border-gray-700 overflow-hidden">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 space-y-1.5">
                    <div className="space-y-2">
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Ngân hàng thụ hưởng</Label>
                      <Select value={bankCode} onValueChange={setBankCode}>
                        <SelectTrigger className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200">
                            <SelectValue placeholder="— Chọn ngân hàng —">
                              {selectedBank && (
                                <span className="flex items-center gap-2">
                                  <img src={selectedBank.logo} alt="" className="w-8 h-8 object-contain" />
                                  <span className="font-medium text-[#2D3A4A] dark:text-gray-200">{selectedBank.name}</span>
                                </span>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] sm:max-h-[400px]">
                            {BANKS.map((bank) => (
                              <SelectItem key={bank.code} value={bank.code}>
                                <span className="flex items-center gap-2">
                                  <img src={bank.logo} alt="" className="w-8 h-8 object-contain" />
                                  <span className="font-medium text-[13px]">{bank.name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Số tài khoản</Label>
                        <Input
                          value={accountNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setAccountNumber(val);
                          }}
                          placeholder="Nhập số tài khoản"
                          className={`h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 font-mono ${!accValid && accountNumber.length > 0 ? "border-red-400 focus:border-red-500" : ""}`}
                          maxLength={MAX_ACCOUNT_LENGTH} />
                      </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Tên chủ tài khoản</Label>
                        <Input
                          value={accountName}
                          onChange={(e) => setAccountName(toUpperCaseNoAccent(e.target.value))}
                          placeholder="VD: NGUYEN VAN A"
                          className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 uppercase" />
                      </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Số tiền (VNĐ) <span className="italic text-[#7A8A9A] dark:text-gray-400">— không bắt buộc</span></Label>
                        <div className="relative">
                          <Input
                            value={amount}
                            onChange={(e) => setAmount(formatAmount(e.target.value))}
                            placeholder="Nhập số tiền"
                            className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 pr-20" />
                          {amount && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5A6A7A] dark:text-gray-400 font-medium">
                              {displayAmount(amount)} ₫
                            </span>
                          )}
                        </div>
                      </div>
                    <div className="space-y-1">
                      <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Nội dung chuyển khoản <span className="italic text-[#7A8A9A] dark:text-gray-400">— không bắt buộc</span></Label>
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="VD: Thanh toan don hang 001"
                          className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200"
                          maxLength={50} />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Số lượng vé / Passenger Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          max="999"
                          value={ticketQuantity}
                          onChange={(e) => setTicketQuantity(e.target.value)}
                          placeholder="VD: 1"
                          className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Đơn giá / Unit Price (VNĐ) <span className="italic text-[#7A8A9A] dark:text-gray-400">— không bắt buộc</span></Label>
                        <div className="relative">
                          <Input
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(formatAmount(e.target.value))}
                            placeholder="VD: 1,500,000"
                            className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 pr-20" />
                          {unitPrice && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5A6A7A] dark:text-gray-400 font-medium">
                              {displayAmount(unitPrice)} ₫
                            </span>
                          )}
                        </div>
                      </div>

                    <div className="space-y-2 mt-4 pt-3 border-t border-[#E5E7EB] dark:border-gray-700">
                      <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Mã đặt vé / Booking Code</Label>
                        <span className="text-[10px] text-[#5A6A7A] dark:text-gray-400">không bắt buộc</span>
                      </div>
                      <Input
                        value={bookingCode}
                        onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
                        placeholder="VD: ABC123"
                        className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 font-mono"
                        maxLength={8} />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Họ tên hành khách</Label>
                        <span className="text-[10px] text-[#5A6A7A] dark:text-gray-400">không bắt buộc</span>
                      </div>
                      <Input
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value.toUpperCase())}
                        placeholder="VD: NGUYEN VAN A"
                        className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 uppercase" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">CMND / CCCD / Hộ chiếu</Label>
                        <span className="text-[10px] text-[#5A6A7A] dark:text-gray-400">không bắt buộc</span>
                      </div>
                      <Input
                        value={passengerId}
                        onChange={(e) => setPassengerId(e.target.value)}
                        placeholder="VD: 0123456789"
                        className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200 font-mono" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Số điện thoại liên hệ</Label>
                        <span className="text-[10px] text-[#5A6A7A] dark:text-gray-400">không bắt buộc</span>
                      </div>
                      <Input
                        value={passengerPhone}
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        placeholder="VD: 0901234567"
                        className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <Label className="text-xs font-medium text-[#2D3A4A] dark:text-gray-100">Email</Label>
                        <span className="text-[10px] text-[#5A6A7A] dark:text-gray-400">không bắt buộc</span>
                      </div>
                      <Input
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        placeholder="VD: passenger@example.com"
                        className="h-[38px] rounded-md text-[12px] border-[#D1D9E6] dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-gray-200" />
                    </div>
                      <Button
                        onClick={onGenerate}
                        disabled={!canGenerate}
                        className="w-full h-[38px] rounded-md text-[13px] font-semibold bg-[#1a3a6b] dark:bg-blue-700 text-white hover:bg-[#163258] dark:hover:bg-blue-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-1.5">
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Đang tạo mã QR...
                          </>
                        ) : (
                          <>
                            <QrCode className="w-4 h-4 mr-1.5" /> Tạo mã QR thanh toán
                          </>
                        )}
                      </Button>
                      
                      {onToggleInvoiceView && (
                        <Button
                          type="button"
                          onClick={onToggleInvoiceView}
                          variant="outline"
                          className="w-full h-[38px] rounded-md text-[13px] font-medium text-[#003366] dark:text-[#FFD700] border-[#003366]/30 dark:border-yellow-600/30 hover:bg-[#003366]/5 dark:hover:bg-yellow-600/5 transition-colors mt-2">
                          <FileText className="w-4 h-4 mr-1.5" />
                          Xem mẫu hóa đơn hàng không
                          <Plane className="w-4 h-4 ml-1.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {showQRPreview && (
                <div className="w-full lg:w-[180px] flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-[#E6EEF7] dark:border-gray-700 p-2">
                  <p className="text-[9px] text-[#5A6A7A] dark:text-gray-400 mb-2 text-center">Xem trước</p>
                  <QRCodeSVG
                    value={qrValue}
                    size={100}
                    level="H"
                    fgColor="#1a3a6b"
                    bgColor="#ffffff"
                    includeMargin={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}