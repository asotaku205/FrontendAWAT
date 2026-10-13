type DeliveryOrderDataType = {
  orderCode: string;
  customerName: string;
  product:string,
  carrier: string;
  station: string;
  status: "Đang vận chuyển"|"Trễ hạn"|"Sắp đến nơi";
  eta: string;
  timeCall: string;
  callStatus: "Đã gọi xong"|"Chưa gọi"|"Cần gọi ngay";
};
export const DeliveryOrderData: DeliveryOrderDataType[] = [
    {

orderCode: "VC-002",
  customerName: "Trần Thị Mai",
  product:"Bugi DENSO IKH20TT",
  carrier: "GHTK",
  station: "Hà Đông",
  status: "Sắp đến nơi",
  eta: "10:15",
  timeCall: "07:15-08:15",
  callStatus: "Đã gọi xong"

},
{

orderCode: "VC-004",
  customerName: "Nguyễn Văn Hùng",
  product:"Bơm xăng DENSO",
  carrier: "VNPost",
  station: "Hà Đông",
  status: "Trễ hạn",
  eta: "14:30",
  timeCall: "12:30-13:30",
  callStatus: "Cần gọi ngay"

},
{

orderCode: "VC-003",
  customerName: "Trần Thị Mai",
  product:"Cảm biến oxy DENSO",
  carrier: "GHN",
  station: "Cầu Giấy",
  status: "Đang vận chuyển",
  eta: "15:00",
  timeCall: "13:00-14:00",
  callStatus: "Chưa gọi"

},
{

orderCode: "VC-001",
  customerName: "Trần Thị Mai",
  product:"Bộ lọc dầu DENSO",
  carrier: "GHTK",
  station: "Hoàn Kiếm",
  status: "Đang vận chuyển",
  eta: "17:30",
  timeCall: "15:30-16:30",
  callStatus: "Chưa gọi"

},
{

orderCode: "VC-007",
  customerName: "Trần Thị Mai",
  product:"Bugi DENSO IKH20TT",
  carrier: "GHTK",
  station: "Hà Đông",
  status: "Đang vận chuyển",
  eta: "18:45",
  timeCall: "16:4517:45",
  callStatus: "Chưa gọi"

},
{

orderCode: "VC-005",
  customerName: "Trần Thị Mai",
  product:"Bugi DENSO IKH20TT",
  carrier: "GHTK",
  station: "Hà Đông",
  status: "Đang vận chuyển",
  eta: "10:15",
  timeCall: "07:15-08:15",
  callStatus: "Đã gọi xong"

},
{

orderCode: "VC-006",
  customerName: "Trần Thị Mai",
  product:"Bugi DENSO IKH20TT",
  carrier: "GHTK",
  station: "Hà Đông",
  status: "Đang vận chuyển",
  eta: "10:15",
  timeCall: "07:15-08:15",
  callStatus: "Đã gọi xong"

}
  
];
