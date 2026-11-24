export interface PaymentMethod {
  id: string;
  label: string;
  note: string;
  available: boolean;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "atm", label: "Thẻ ATM/Tài khoản ngân hàng", note: "Phí giao dịch 1,2%", available: false },
  { id: "atm-vnpay", label: "Thẻ ATM nội địa qua VNPAY", note: "Phí giao dịch 1%", available: false },
  { id: "credit-onepay", label: "Thẻ tín dụng qua OnePay", note: "Phí giao dịch 3.4%", available: false },
  { id: "credit-vnpay", label: "Thẻ tín dụng qua VNPAY", note: "Phí giao dịch 2.5%", available: false },
  { id: "transfer", label: "Chuyển khoản ngân hàng / VietQR", note: "Miễn phí giao dịch", available: true },
];
