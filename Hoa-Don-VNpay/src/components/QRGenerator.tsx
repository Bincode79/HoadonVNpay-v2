import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { QRForm } from "@/components/QRForm";
import { QRResult } from "@/components/QRResult";
import { AirlineInvoice } from "@/components/AirlineInvoice";
import { createVietQRRequest, generateVietQR } from "@/services/vietqr";

const QR_SIZES = [96, 128, 160, 192, 224, 256];

export default function QRGenerator() {
  const [searchParams] = useSearchParams();
  const [bankCode, setBankCode] = useState(searchParams.get("bank") || "");
  const [accountNumber, setAccountNumber] = useState(searchParams.get("acc") || "");
  const [accountName, setAccountName] = useState(searchParams.get("name") || "");
  const [amount, setAmount] = useState(searchParams.get("amount") || "");
  const [message, setMessage] = useState(searchParams.get("msg") || "");
  const [bookingCode, setBookingCode] = useState(searchParams.get("code") || searchParams.get("booking") || searchParams.get("pnr") || "");
  const [passengerName, setPassengerName] = useState(searchParams.get("passenger") || searchParams.get("customer") || "");
  const [passengerId, setPassengerId] = useState(searchParams.get("passengerId") || searchParams.get("id") || "");
  const [passengerPhone, setPassengerPhone] = useState(searchParams.get("phone") || "");
  const [passengerEmail, setPassengerEmail] = useState(searchParams.get("email") || "");
  const [flightNumber, setFlightNumber] = useState(searchParams.get("flight") || "");
  const [route, setRoute] = useState(searchParams.get("route") || "");
  const [flightDate, setFlightDate] = useState(searchParams.get("flightDate") || "");
  const [flightTime, setFlightTime] = useState(searchParams.get("flightTime") || "");
  const [seatClass, setSeatClass] = useState(searchParams.get("seatClass") || "Economy");
  const [ticketQuantity, setTicketQuantity] = useState(searchParams.get("quantity") || searchParams.get("qty") || "1");
  const [unitPrice, setUnitPrice] = useState(searchParams.get("unitPrice") || "");
  const [generated, setGenerated] = useState(!!searchParams.get("bank") && !!searchParams.get("acc"));
  const [qrSize] = useState(150);
  const [logoSize, setLogoSize] = useState(36);
  const [useLocalQR, setUseLocalQR] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [qrData, setQrData] = useState<string>("");
  const [showAirlineInvoice, setShowAirlineInvoice] = useState(
    () => searchParams.get("invoice") === "1" || searchParams.get("view") === "invoice",
  );

  const qrValue = useMemo(() => {
    if (!bankCode || !accountNumber) return "";
    const accName = accountName ? accountName.replace(/\s+/g, ' ').trim().toUpperCase() : "";
    const qrAmount = amount || "0";
    const qrMessage = message ? message.replace(/\s+/g, ' ').trim() : "";
    return `${bankCode}|${accountNumber}|${accName}|${qrAmount}|${qrMessage}`;
  }, [bankCode, accountNumber, accountName, amount, message]);

  const handleGenerate = useCallback(async () => {
    if (!bankCode || !accountNumber) {
      toast.error("Vui lòng chọn ngân hàng và nhập số tài khoản!");
      return;
    }

    setIsLoading(true);
    try {
      const request = createVietQRRequest(bankCode, accountNumber, accountName, amount || undefined, message || undefined);
      const response = await generateVietQR(request);

      if (response.code === "00" && response.data?.qrCode) {
        setQrData(response.data.qrCode);
        setUseLocalQR(false);
        toast.success("Đã tạo mã QR thành công!");
      } else {
        toast.error(response.desc || "Không thể tạo mã QR");
        setUseLocalQR(true);
        setQrData(qrValue);
      }
    } catch {
      toast.error("Lỗi kết nối API, sử dụng QR cục bộ");
      setUseLocalQR(true);
      setQrData(qrValue);
    } finally {
      setIsLoading(false);
      setGenerated(true);
    }
  }, [bankCode, accountNumber, accountName, amount, message, qrValue]);

  const handleReset = useCallback(() => {
    setGenerated(false);
    setBankCode("");
    setAccountNumber("");
    setAccountName("");
    setAmount("");
    setMessage("");
    setBookingCode("");
    setPassengerName("");
    setPassengerId("");
    setPassengerPhone("");
    setPassengerEmail("");
    setFlightNumber("");
    setRoute("");
    setFlightDate("");
    setFlightTime("");
    setSeatClass("Economy");
    setTicketQuantity("1");
    setUnitPrice("");
    setQrData("");
    setUseLocalQR(true);
  }, []);

  useEffect(() => {
    if (searchParams.get("bank") && searchParams.get("acc")) {
      handleGenerate();
    }
  }, [searchParams, handleGenerate]);

  if (generated) {
    if (showAirlineInvoice) {
      return (
        <AirlineInvoice
          bankCode={bankCode}
          accountNumber={accountNumber}
          accountName={accountName}
          amount={amount}
          message={message}
          bookingCode={bookingCode}
          passengerName={passengerName}
          passengerId={passengerId}
          passengerPhone={passengerPhone}
          passengerEmail={passengerEmail}
          flightNumber={flightNumber}
          route={route}
          flightDate={flightDate}
          flightTime={flightTime}
          seatClass={seatClass}
          ticketQuantity={ticketQuantity}
          unitPrice={unitPrice}
          qrValue={qrValue}
          qrData={qrData}
          useLocalQR={useLocalQR}
          isLoading={isLoading}
          logoSize={logoSize}
          qrSize={qrSize}
          onReset={handleReset}
        />
      );
    }
    return (
      <QRResult
        bankCode={bankCode}
        accountNumber={accountNumber}
        accountName={accountName}
        amount={amount}
        message={message}
        qrValue={qrValue}
        qrData={qrData}
        useLocalQR={useLocalQR}
        isLoading={isLoading}
        logoSize={logoSize}
        qrSize={qrSize}
        onReset={handleReset}
        onToggleInvoiceView={() => setShowAirlineInvoice(true)}
        passengerName={passengerName}
        passengerId={passengerId}
        passengerPhone={passengerPhone}
        passengerEmail={passengerEmail}
        flightNumber={flightNumber}
        route={route}
        flightDate={flightDate}
        flightTime={flightTime}
        seatClass={seatClass}
        ticketQuantity={ticketQuantity}
        unitPrice={unitPrice}
      />
    );
  }

  return (
      <QRForm
        bankCode={bankCode}
        setBankCode={setBankCode}
        accountNumber={accountNumber}
        setAccountNumber={setAccountNumber}
        accountName={accountName}
        setAccountName={setAccountName}
        amount={amount}
        setAmount={setAmount}
        message={message}
        setMessage={setMessage}
        bookingCode={bookingCode}
        setBookingCode={setBookingCode}
        passengerName={passengerName}
        setPassengerName={setPassengerName}
        passengerId={passengerId}
        setPassengerId={setPassengerId}
        passengerPhone={passengerPhone}
        setPassengerPhone={setPassengerPhone}
        passengerEmail={passengerEmail}
        setPassengerEmail={setPassengerEmail}
        flightNumber={flightNumber}
        setFlightNumber={setFlightNumber}
        route={route}
        setRoute={setRoute}
        flightDate={flightDate}
        setFlightDate={setFlightDate}
        flightTime={flightTime}
        setFlightTime={setFlightTime}
        seatClass={seatClass}
        setSeatClass={setSeatClass}
        ticketQuantity={ticketQuantity}
        setTicketQuantity={setTicketQuantity}
        unitPrice={unitPrice}
        setUnitPrice={setUnitPrice}
        logoSize={logoSize}
        setLogoSize={setLogoSize}
        isLoading={isLoading}
        onGenerate={handleGenerate}
        qrValue={qrValue}
        onToggleInvoiceView={() => setShowAirlineInvoice(true)}
      />
  );
}