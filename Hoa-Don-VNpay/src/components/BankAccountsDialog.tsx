import { useState } from "react";
import { X } from "lucide-react";
import { BANKS } from "@/data/banks";

interface BankAccountsDialogProps {
  currentBankCode: string;
  currentAccountNumber: string;
  currentAccountName: string;
}

const SAMPLE_ACCOUNTS = [
  { bankCode: "970436", accountNumber: "1234567890", accountName: "CONG TY ABC" },
  { bankCode: "970415", accountNumber: "0987654321", accountName: "CONG TY ABC" },
  { bankCode: "970422", accountNumber: "1122334455", accountName: "CONG TY ABC" },
  { bankCode: "970407", accountNumber: "5566778899", accountName: "CONG TY ABC" },
  { bankCode: "970423", accountNumber: "9988776655", accountName: "CONG TY ABC" },
];

export function BankAccountsDialog({
  currentBankCode,
  currentAccountNumber,
  currentAccountName,
}: BankAccountsDialogProps) {
  const [open, setOpen] = useState(false);

  const allAccounts = [
    { bankCode: currentBankCode, accountNumber: currentAccountNumber, accountName: currentAccountName, isCurrent: true },
    ...SAMPLE_ACCOUNTS
      .filter((a) => a.accountNumber !== currentAccountNumber)
      .slice(0, 9)
      .map((a) => ({ ...a, isCurrent: false })),
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="no-print text-[11px] font-medium text-[#002855] underline decoration-[#002855]/30 underline-offset-2 hover:text-[#004B87] dark:text-blue-300 dark:decoration-blue-400/40"
      >
        Xem tài khoản ngân hàng khác
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-lg border border-[#CBD7E4] bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-[#E3EAF2] px-5 py-3.5 dark:border-gray-700">
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-[#002855] dark:text-blue-300">
                Tài khoản ngân hàng
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-[#64748B] hover:bg-[#EEF3F8] dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[calc(80vh-64px)] space-y-2 overflow-y-auto p-3">
              {allAccounts.map((acc) => {
                const bank = BANKS.find((b) => b.code === acc.bankCode);
                return (
                  <div
                    key={`${acc.bankCode}-${acc.accountNumber}`}
                    className={`rounded-md border px-3 py-2.5 ${
                      acc.isCurrent
                        ? "border-[#005BAC] bg-[#F2F7FC] dark:border-blue-400 dark:bg-blue-900/20"
                        : "border-[#CBD7E4] bg-white dark:border-gray-700 dark:bg-gray-800"
                    }`}
                  >
                    <div className="mb-1.5 flex items-center gap-2">
                      {bank?.logo && (
                        <img src={bank.logo} alt="" className="h-5 w-5 rounded-sm object-contain" />
                      )}
                      <span className="truncate text-xs font-medium text-[#111827] dark:text-gray-100">
                        {bank?.name || acc.bankCode}
                      </span>
                      {acc.isCurrent && (
                        <span className="rounded-sm bg-[#002855] px-1.5 py-0.5 text-[8px] font-bold uppercase text-white dark:bg-blue-600">
                          Mặc định
                        </span>
                      )}
                    </div>
                    <p className="truncate text-[11px] text-[#475569] dark:text-gray-300">{acc.accountName}</p>
                    <p className="mt-0.5 font-mono text-xs tabular-nums text-[#111827] dark:text-gray-100">
                      {acc.accountNumber}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
