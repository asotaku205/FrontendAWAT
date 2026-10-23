
type KpiCardType = {
    label:string,
    value:string,
    sub?:string,

}
const KpiCard = ({ label, value, sub}: KpiCardType) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
    <div className="text-xs text-gray-500">{label}</div>
    <div className="mt-1 text-xl font-bold">
      {value}
    </div>
    {sub && <div className="mt-1 text-xs text-gray-500">{sub}</div>}
  </div>
  )
}

export default KpiCard