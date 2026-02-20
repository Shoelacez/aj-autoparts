import React from "react"
import { products } from "../data/products.js"
import { sales } from "../data/sales.js"
import { expenses } from "../data/expenses.js"
import { useNavigate } from "react-router-dom"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

const Dashboard = () => {
  const navigate = useNavigate()

  // Summary calculations
  const totalProducts = products.length
  const lowStockItems = products.filter(p => p.stock <= 5).length
  const totalSales = sales.reduce((sum, s) => sum + s.totalAmount, 0)
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const recentProducts = [...products].slice(-5).reverse()

  // Prepare sales data grouped by date
  const salesByDate = []
  const salesMap = {}
  sales.forEach(s => {
    if (!salesMap[s.date]) salesMap[s.date] = 0
    salesMap[s.date] += s.totalAmount
  })
  Object.keys(salesMap)
    .sort()
    .forEach(date => salesByDate.push({ date, total: salesMap[date] }))

  // Prepare stock data for Low Stock warning chart
  const lowStockData = products
    .filter(p => p.stock <= 5)
    .map(p => ({ name: p.name, stock: p.stock }))

  // Prepare Sales vs Expenses data (profit visualization)
  const profitMap = {}
  const dates = Array.from(
    new Set([...sales.map(s => s.date), ...expenses.map(e => e.date)])
  ).sort()

  dates.forEach(date => {
    const saleTotal = sales.filter(s => s.date === date).reduce((a, b) => a + b.totalAmount, 0)
    const expenseTotal = expenses.filter(e => e.date === date).reduce((a, b) => a + b.amount, 0)
    profitMap[date] = { date, sales: saleTotal, expenses: expenseTotal }
  })
  const profitData = Object.values(profitMap)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Top Summary Cards (clickable) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          className="bg-white shadow rounded-lg p-4 flex flex-col items-start cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/inventory")}
        >
          <span className="text-gray-500 text-sm">Total Products</span>
          <span className="text-2xl font-bold text-gray-800">{totalProducts}</span>
        </div>

        <div
          className="bg-white shadow rounded-lg p-4 flex flex-col items-start cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/inventory")}
        >
          <span className="text-gray-500 text-sm">Low Stock Items</span>
          <span className="text-2xl font-bold text-red-600">{lowStockItems}</span>
        </div>

        <div
          className="bg-white shadow rounded-lg p-4 flex flex-col items-start cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/sales")}
        >
          <span className="text-gray-500 text-sm">Total Sales</span>
          <span className="text-2xl font-bold text-green-600">
            ₮ {totalSales.toLocaleString()}
          </span>
        </div>

        <div
          className="bg-white shadow rounded-lg p-4 flex flex-col items-start cursor-pointer hover:shadow-lg transition"
          onClick={() => navigate("/expenses")}
        >
          <span className="text-gray-500 text-sm">Total Expenses</span>
          <span className="text-2xl font-bold text-yellow-600">
            ₮ {totalExpenses.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Over Time */}
        <div className="bg-white shadow rounded-lg p-4 lg:col-span-1">
          <h2 className="font-semibold text-gray-700 mb-4">Sales Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesByDate}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={value => `₮ ${value.toLocaleString()}`} />
                <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Warning Chart */}
        <div className="bg-white shadow rounded-lg p-4 lg:col-span-1">
          <h2 className="font-semibold text-gray-700 mb-4">Low Stock Warning</h2>
          <div className="h-64">
            {lowStockData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lowStockData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
                  <Bar dataKey="stock" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                All products have sufficient stock
              </div>
            )}
          </div>
        </div>

        {/* Sales vs Expenses Chart */}
        <div className="bg-white shadow rounded-lg p-4 lg:col-span-1">
          <h2 className="font-semibold text-gray-700 mb-4">Sales vs Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={profitData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [`₮ ${value.toLocaleString()}`, name]}
                />
                <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="expenses" stroke="#f59e0b" strokeWidth={2} />
                <Legend verticalAlign="top" height={36} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Products Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-semibold text-gray-700 mb-4">Recent Products Added</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">OEM</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Brand</th>
                <th className="px-4 py-3 text-left">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{p.oem}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{p.name}</td>
                  <td className="px-4 py-3">{p.brand}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard