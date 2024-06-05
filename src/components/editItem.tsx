import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../configs/axiosConfig";

function EditItem() {
  const { id } = useParams();
  const [item, setItem] = useState({
    product_category: "",
    price: "",
    date: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axiosInstance.get(`/order_items/${id}`, {
        auth: { username: "seller_id", password: "seller_zip_code_prefix" },
      });
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await axiosInstance.patch(`/order_items/${id}`, item, {
            auth: { username: "seller_id", password: "seller_zip_code_prefix" },
        });
        navigate(`/item/${id}`);
    } catch (error) {
        console.error(error);
    }
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Product Category</label>
          <input
            type="text"
            name="product_category"
            value={item.product_category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Shipping Date</label>
          <input
            type="date"
            name="date"
            value={item.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditItem;
