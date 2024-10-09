// data migrasi dari index.html ke app/dashboard/page.jsx

"use client";

// dashboard/page.jsx
import React, { useState } from "react";
import {
  addItemToCart,
  removeItemFromCart,
  calculateTotalItems,
} from "../utils/dataProcessor";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const DashboardPage = () => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    const newItem = {
      name: formData.name,
      quantity: parseInt(formData.quantity),
      price: parseInt(formData.price),
    };
    const updatedCart = addItemToCart(cart, newItem);
    setCart(updatedCart);
    setTotalItems(calculateTotalItems(updatedCart));
    setFormData({ name: "", quantity: "", price: "" }); // Clear form
  };

  const handleRemoveItem = (index) => {
    const updatedCart = removeItemFromCart(cart, index);
    setCart(updatedCart);
    setTotalItems(calculateTotalItems(updatedCart));
  };

  const handleProcessTransaction = () => {
    if (cart.length > 0) {
      alert("Transaksi berhasil diproses!");
      setCart([]);
      setTotalItems(0);
    } else {
      alert("Keranjang masih kosong!");
    }
  };

  const items = [
    { title: "Item 1", description: "Description for Item 1", link: "/item1" },
    { title: "Item 2", description: "Description for Item 2", link: "/item2" },
    { title: "Item 3", description: "Description for Item 3", link: "/item3" },
    { title: "Item 4", description: "Description for Item 4", link: "/item4" },
    { title: "Item 5", description: "Description for Item 5", link: "/item5" },
    { title: "Item 6", description: "Description for Item 6", link: "/item6" },
  ];

  return (
    <div className="flex flex-col min-h-screen p-8 space-y-8">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="w-full max-w-4xl mx-auto">
          <HoverEffect
            items={items}
            className="mb-8 h-auto overflow-visible bg-transparent"
          />
        </div>

      <div className="flex-grow flex flex-col space-y-8">
        <div className="w-full max-w-2xl mx-auto">
          <form
            onSubmit={handleAddItem}
            id="form-transaksi"
            className="mb-8 space-y-4 bg-white p-4 rounded-lg shadow-md z-10 relative"
          >
            <input
              type="text"
              id="nama-barang"
              name="name"
              placeholder="Nama Barang"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              id="jumlah-barang"
              name="quantity"
              placeholder="Jumlah Barang"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              id="harga-barang"
              name="price"
              placeholder="Harga Barang"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Tambah ke Keranjang
            </button>
          </form>
        </div>

        

        <div className="w-full max-w-2xl mx-auto">
          <div className="overflow-x-auto mb-8">
            <table id="tabel-keranjang" className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Nama Barang</th>
                  <th className="p-2 border">Jumlah</th>
                  <th className="p-2 border">Harga</th>
                  <th className="p-2 border">Total</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border">{item.quantity}</td>
                    <td className="p-2 border">{item.price}</td>
                    <td className="p-2 border">{item.total}</td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="p-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-2 mb-4 bg-white p-4 rounded-lg shadow-md">
            <div>
              <strong>Total Stok: {totalItems}</strong>
            </div>
            <div>
              <strong>Barang Masuk: {totalItems}</strong>
            </div>
            <div>
              <strong>Barang Keluar: {totalItems}</strong>
            </div>
          </div>

          <button
            id="proses-transaksi"
            onClick={handleProcessTransaction}
            className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Proses Transaksi
          </button>
        </div>
      </div>
    </div>
  );
};


export default DashboardPage;
