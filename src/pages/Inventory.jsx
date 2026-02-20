import { useState } from "react"
import { products as initialProducts } from "../data/products.js"

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [popupId, setPopupId] = useState(null) // which row's popup is open
  const [formProduct, setFormProduct] = useState({
    oem: "",
    name: "",
    brand: "",
    unit_bp: "",
    selling_price: "",
    stock: "",
  })

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.oem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const resetForm = () => {
    setEditingId(null)
    setFormProduct({ oem: "", name: "", brand: "", unit_bp: "", selling_price: "", stock: "" })
    setShowForm(false)
    setPopupId(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const entry = {
      id: editingId || products.length + 1,
      ...formProduct,
      unit_bp: Number(formProduct.unit_bp),
      selling_price: Number(formProduct.selling_price),
      stock: Number(formProduct.stock),
    }

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? entry : p))
    } else {
      setProducts([...products, entry])
    }

    resetForm()
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setFormProduct({
      oem: product.oem,
      name: product.name,
      brand: product.brand,
      unit_bp: product.unit_bp,
      selling_price: product.selling_price,
      stock: product.stock,
    })
    setShowForm(true)
    setPopupId(null)
  }

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id))
      if (editingId === id) resetForm()
    }
    setPopupId(null)
  }

  return (
    <div className="space-y-6">

      {/* Header + Search + Add */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by OEM, Product, or Brand"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => { resetForm(); setShowForm(!showForm) }}
        >
          + Add Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border border-gray-200 rounded-md p-4 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="text" placeholder="OEM" className="border rounded px-3 py-2 w-full"
              value={formProduct.oem} onChange={e => setFormProduct({...formProduct,oem:e.target.value})} required />
            <input type="text" placeholder="Product Name" className="border rounded px-3 py-2 w-full"
              value={formProduct.name} onChange={e => setFormProduct({...formProduct,name:e.target.value})} required />
            <input type="text" placeholder="Brand" className="border rounded px-3 py-2 w-full"
              value={formProduct.brand} onChange={e => setFormProduct({...formProduct,brand:e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input type="number" placeholder="Cost (BP)" className="border rounded px-3 py-2 w-full"
              value={formProduct.unit_bp} onChange={e => setFormProduct({...formProduct,unit_bp:e.target.value})} required />
            <input type="number" placeholder="Selling Price" className="border rounded px-3 py-2 w-full"
              value={formProduct.selling_price} onChange={e => setFormProduct({...formProduct,selling_price:e.target.value})} required />
            <input type="number" placeholder="Stock" className="border rounded px-3 py-2 w-full"
              value={formProduct.stock} onChange={e => setFormProduct({...formProduct,stock:e.target.value})} required />
          </div>
          <div className="flex gap-2">
            <button type="submit"
              className={`${editingId ? "bg-blue-600 hover:bg-blue-500" : "bg-green-600 hover:bg-green-500"} text-white px-4 py-2 rounded-md transition`}
            >
              {editingId ? "Update Product" : "Save Product"}
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">OEM</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-left">Cost (BP)</th>
              <th className="px-4 py-3 text-left">Selling Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition relative">
                <td className="px-4 py-3">{product.oem}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                <td className="px-4 py-3">{product.brand}</td>
                <td className="px-4 py-3">{product.unit_bp.toLocaleString()} TZS</td>
                <td className="px-4 py-3">{product.selling_price.toLocaleString()} TZS</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  {product.stock > 5 ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Low Stock</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {/* Popup trigger */}
                  <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={(e) => { e.stopPropagation(); setPopupId(popupId === product.id ? null : product.id) }}
                  >
                    ⋮
                  </button>

                  {/* Popup Menu */}
                  {popupId === product.id && (
                    <div className="absolute right-4 bg-white border border-gray-200 shadow-md rounded-md mt-1 z-10">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inventory