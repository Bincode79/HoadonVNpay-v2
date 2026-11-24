export interface Bank {
  code: string;
  name: string;
  fullName: string;
  logo: string;
}

const bankLogos = import.meta.glob<{ default: string }>('/src/assets/banks/*.png', {
  eager: true,
  query: '?url',
});

const getLogoUrl = (code: string): string => {
  const path = `/src/assets/banks/${code}.png`;
  const mod = bankLogos[path];
  return mod?.default || '';
};

export const BANKS: Bank[] = [
  { code: "970405", name: "Agribank", fullName: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam", logo: getLogoUrl("970405") },
  { code: "970416", name: "ACB", fullName: "Ngân hàng TMCP Á Châu", logo: getLogoUrl("970416") },
  { code: "970425", name: "ABB", fullName: "Ngân hàng TMCP An Bình", logo: getLogoUrl("970425") },
  { code: "970409", name: "BAB", fullName: "Ngân hàng TMCP Bắc Á", logo: getLogoUrl("970409") },
  { code: "970418", name: "BIDV", fullName: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam", logo: getLogoUrl("970418") },
  { code: "970438", name: "BVB", fullName: "Ngân hàng TMCP Bảo Việt", logo: getLogoUrl("970438") },
  { code: "546034", name: "CAKE", fullName: "CAKE by VPBank - Ngân hàng số", logo: getLogoUrl("546034") },
  { code: "970444", name: "CBB", fullName: "Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam", logo: getLogoUrl("970444") },
  { code: "422589", name: "CIMB", fullName: "Ngân hàng TNHH MTV CIMB Việt Nam", logo: getLogoUrl("422589") },
  { code: "533948", name: "CITIBANK", fullName: "Ngân hàng Citibank, N.A. - Chi nhánh Hà Nội", logo: getLogoUrl("533948") },
  { code: "970446", name: "COOPBANK", fullName: "Ngân hàng Hợp tác xã Việt Nam", logo: getLogoUrl("970446") },
  { code: "796500", name: "DBS", fullName: "DBS Bank Ltd - Chi nhánh TP. Hồ Chí Minh", logo: getLogoUrl("796500") },
  { code: "970406", name: "DOB", fullName: "Ngân hàng TMCP Đông Á", logo: getLogoUrl("970406") },
  { code: "970431", name: "EIB", fullName: "Ngân hàng TMCP Xuất Nhập khẩu Việt Nam", logo: getLogoUrl("970431") },
  { code: "970408", name: "GPB", fullName: "Ngân hàng Thương mại TNHH MTV Dầu Khí Toàn Cầu", logo: getLogoUrl("970408") },
  { code: "970437", name: "HDB", fullName: "Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh", logo: getLogoUrl("970437") },
  { code: "970442", name: "HLBVN", fullName: "Ngân hàng TNHH MTV Hong Leong Việt Nam", logo: getLogoUrl("970442") },
  { code: "458761", name: "HSBC", fullName: "Ngân hàng TNHH MTV HSBC (Việt Nam)", logo: getLogoUrl("458761") },
  { code: "970456", name: "IBK-HCM", fullName: "Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh TP. Hồ Chí Minh", logo: getLogoUrl("970456") },
  { code: "970455", name: "IBK-HN", fullName: "Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội", logo: getLogoUrl("970455") },
  { code: "970415", name: "VietinBank", fullName: "Ngân hàng TMCP Công thương Việt Nam", logo: getLogoUrl("970415") },
  { code: "970434", name: "IVB", fullName: "Ngân hàng TNHH Indovina", logo: getLogoUrl("970434") },
  { code: "970463", name: "KBHCM", fullName: "Ngân hàng Kookmin - Chi nhánh Thành phố Hồ Chí Minh", logo: getLogoUrl("970463") },
  { code: "970462", name: "KBHN", fullName: "Ngân hàng Kookmin - Chi nhánh Hà Nội", logo: getLogoUrl("970462") },
  { code: "668888", name: "KBank", fullName: "Ngân hàng Đại chúng TNHH Kasikornbank", logo: getLogoUrl("668888") },
  { code: "970466", name: "KEBHANAHCM", fullName: "Ngân hàng KEB Hana - Chi nhánh TP. Hồ Chí Minh", logo: getLogoUrl("970466") },
  { code: "970467", name: "KEBHANAHN", fullName: "Ngân hàng KEB Hana - Chi nhánh Hà Nội", logo: getLogoUrl("970467") },
  { code: "970452", name: "KLB", fullName: "Ngân hàng TMCP Kiên Long", logo: getLogoUrl("970452") },
  { code: "970449", name: "LPBANK", fullName: "Ngân hàng TMCP Bưu điện Liên Việt", logo: getLogoUrl("970449") },
  { code: "977777", name: "MAFC", fullName: "Công ty Tài chính TNHH MTV Mirae Asset (Việt Nam)", logo: getLogoUrl("977777") },
  { code: "970422", name: "MB Bank", fullName: "Ngân hàng TMCP Quân đội", logo: getLogoUrl("970422") },
  { code: "970426", name: "MSB", fullName: "Ngân hàng TMCP Hàng Hải", logo: getLogoUrl("970426") },
  { code: "970428", name: "NAB", fullName: "Ngân hàng TMCP Nam Á", logo: getLogoUrl("970428") },
  { code: "970419", name: "NCB", fullName: "Ngân hàng TMCP Quốc Dân", logo: getLogoUrl("970419") },
  { code: "801011", name: "NHB HN", fullName: "Ngân hàng Nonghyup - Chi nhánh Hà Nội", logo: getLogoUrl("801011") },
  { code: "970448", name: "OCB", fullName: "Ngân hàng TMCP Phương Đông", logo: getLogoUrl("970448") },
  { code: "970414", name: "Oceanbank", fullName: "Ngân hàng Thương mại TNHH MTV Đại Dương", logo: getLogoUrl("970414") },
  { code: "970439", name: "PBVN", fullName: "Ngân hàng TNHH MTV Public Việt Nam", logo: getLogoUrl("970439") },
  { code: "970430", name: "PGB", fullName: "Ngân hàng TMCP Xăng dầu Petrolimex", logo: getLogoUrl("970430") },
  { code: "970412", name: "PVCB", fullName: "Ngân hàng TMCP Đại Chúng Việt Nam", logo: getLogoUrl("970412") },
  { code: "970429", name: "SCB", fullName: "Ngân hàng TMCP Sài Gòn", logo: getLogoUrl("970429") },
  { code: "970410", name: "SCVN", fullName: "Ngân hàng TNHH MTV Standard Chartered Bank Việt Nam", logo: getLogoUrl("970410") },
  { code: "970440", name: "SEAB", fullName: "Ngân hàng TMCP Đông Nam Á", logo: getLogoUrl("970440") },
  { code: "970400", name: "SGICB", fullName: "Ngân hàng TMCP Sài Gòn Công Thương", logo: getLogoUrl("970400") },
  { code: "970443", name: "SHB", fullName: "Ngân hàng TMCP Sài Gòn - Hà Nội", logo: getLogoUrl("970443") },
  { code: "970424", name: "SHBVN", fullName: "Ngân hàng TNHH MTV Shinhan Việt Nam", logo: getLogoUrl("970424") },
  { code: "970403", name: "STB", fullName: "Ngân hàng TMCP Sài Gòn Thương Tín", logo: getLogoUrl("970403") },
  { code: "970407", name: "Techcombank", fullName: "Ngân hàng TMCP Kỹ thương Việt Nam", logo: getLogoUrl("970407") },
  { code: "963388", name: "TIMO", fullName: "Timo by Ban Viet Bank - Ngân hàng số", logo: getLogoUrl("963388") },
  { code: "970423", name: "TPBank", fullName: "Ngân hàng TMCP Tiên Phong", logo: getLogoUrl("970423") },
  { code: "970458", name: "UOB", fullName: "Ngân hàng United Overseas - Chi nhánh TP. Hồ Chí Minh", logo: getLogoUrl("970458") },
  { code: "546035", name: "Ubank", fullName: "Ubank by VPBank - Ngân hàng số", logo: getLogoUrl("546035") },
  { code: "970427", name: "VAB", fullName: "Ngân hàng TMCP Việt Á", logo: getLogoUrl("970427") },
  { code: "999888", name: "VBSP", fullName: "Ngân hàng Chính sách Xã hội", logo: getLogoUrl("999888") },
  { code: "970436", name: "Vietcombank", fullName: "Ngân hàng TMCP Ngoại Thương Việt Nam", logo: getLogoUrl("970436") },
  { code: "970454", name: "VCCB", fullName: "Ngân hàng TMCP Bản Việt", logo: getLogoUrl("970454") },
  { code: "970441", name: "VIB", fullName: "Ngân hàng TMCP Quốc tế Việt Nam", logo: getLogoUrl("970441") },
  { code: "970433", name: "VIETBANK", fullName: "Ngân hàng TMCP Việt Nam Thương Tín", logo: getLogoUrl("970433") },
  { code: "971011", name: "VNPTMONEY", fullName: "VNPT Money", logo: getLogoUrl("971011") },
  { code: "970432", name: "VPBank", fullName: "Ngân hàng TMCP Việt Nam Thịnh Vượng", logo: getLogoUrl("970432") },
  { code: "970421", name: "VRB", fullName: "Ngân hàng Liên doanh Việt - Nga", logo: getLogoUrl("970421") },
  { code: "971005", name: "VTLMONEY", fullName: "Viettel Money", logo: getLogoUrl("971005") },
  { code: "970457", name: "WVN", fullName: "Ngân hàng TNHH MTV Woori Việt Nam", logo: getLogoUrl("970457") },
  { code: "momo", name: "MoMo", fullName: "Ví điện tử MoMo", logo: getLogoUrl("momo") },
  { code: "viettelmoney", name: "Viettel Money", fullName: "Viettel Money - Tài khoản tiền di động", logo: getLogoUrl("viettelmoney") },
];