import { useState } from "react"
import { sales as initialSales } from "../data/sales.js"

const Sales = () => {
  const [sales, setSales] = useState(initialSales)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSales = sales.filter(
    (s) =>
      s.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.date.includes(searchTerm)
  )

  // Total sales sum
  const totalSalesAmount = sales.reduce((sum, s) => sum + s.totalAmount, 0)

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Sales</h1>

      {/* Search + Add Sale */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by Product, Customer, or Date"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition"
          onClick={() => alert("Add Sale Form Coming Soon")}
        >
          + Add Sale
        </button>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <span className="text-gray-500 text-sm">Total Sales</span>
          <span className="text-2xl font-bold text-green-600">₮ {totalSalesAmount.toLocaleString()}</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <span className="text-gray-500 text-sm">Total Orders</span>
          <span className="text-2xl font-bold text-gray-800">{sales.length}</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <span className="text-gray-500 text-sm">Top Selling Product</span>
          {/* simple calculation */}
          <span className="text-2xl font-bold text-gray-800">
            {(() => {
              const counts = {}
              sales.forEach(s => counts[s.product] = (counts[s.product] || 0) + s.quantity)
              return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, "")
            })()}
          </span>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Quantity</th>
              <th className="px-4 py-3 text-left">Unit Price</th>
              <th className="px-4 py-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredSales.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{sale.date}</td>
                <td className="px-4 py-3">{sale.customer}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{sale.product}</td>
                <td className="px-4 py-3">{sale.quantity}</td>
                <td className="px-4 py-3">₮ {sale.unitPrice.toLocaleString()}</td>
                <td className="px-4 py-3">₮ {sale.totalAmount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Sales