import { useState } from "react"
import { expenses as initialExpenses } from "../data/expenses.js" // create this file next

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredExpenses = expenses.filter(
    (e) =>
      e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.date.includes(searchTerm)
  )

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>

      {/* Search + Add Expense */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by Category, Description, or Date"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition"
          onClick={() => alert("Add Expense Form Coming Soon")}
        >
          + Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <span className="text-gray-500 text-sm">Total Expenses</span>
          <span className="text-2xl font-bold text-red-600">₮ {totalExpenses.toLocaleString()}</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <span className="text-gray-500 text-sm">Number of Expenses</span>
          <span className="text-2xl font-bold text-gray-800">{expenses.length}</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <span className="text-gray-500 text-sm">Top Category</span>
          <span className="text-2xl font-bold text-gray-800">
            {(() => {
              const counts = {}
              expenses.forEach(e => counts[e.category] = (counts[e.category] || 0) + e.amount)
              return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, "")
            })()}
          </span>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3">{expense.date}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{expense.category}</td>
                <td className="px-4 py-3">{expense.description}</td>
                <td className="px-4 py-3">₮ {expense.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Expenses