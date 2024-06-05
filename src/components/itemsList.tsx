import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../configs/axiosConfig";

interface Item {
  id: string;
  _id: string;
  product_category: string;
  price: number;
  date: string;
  freight_value: string;
}

function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchItems();
  }, [offset]);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get(`/order_items`, {
        params: { limit, offset },
        auth: {
          username: "ce3ad9de960102d0677a81f5d0bb7b2d",
          password: "20031",
        },
      });
      setItems(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Items List</h1>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/item/${item.id}`}
            className="border p-4 rounded shadow"
          >
            <h2 className="text-xl font-semibold">{item.product_category}</h2>
            <p>Price: ${item.price}</p>
            <p>Shipping Date: {new Date(item.date).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
      <div className="mt-4 flex justify-between gap-8">
        <button
          disabled={offset === 0}
          onClick={() => setOffset(offset - limit)}
          className="bg-gray-300 p-2 rounded cursor-pointer"
        >
          Previous
        </button>
        <button
          disabled={offset + limit >= total}
          onClick={() => setOffset(offset + limit)}
          className="bg-gray-300 p-2 rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ItemsList;
