import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../configs/axiosConfig";

interface Item {
  id: string;
  product_category: string;
  price: number;
  date: string;
  freight_value: string;
}

function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axiosInstance.get(`/order_items/${id}`, {
        auth: {
          username: "ce3ad9de960102d0677a81f5d0bb7b2d",
          password: "20031",
        },
      });
      setItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async () => {
    try {
      await axiosInstance.delete(`/order_items/${id}`, {
        auth: {
          username: "ce3ad9de960102d0677a81f5d0bb7b2d",
          password: "20031",
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) return <p>No Item found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Item Detail</h1>
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold">{item.product_category}</h2>
        <p>Price: ${item.price}</p>
        <p>Frieght Value: ${item.freight_value}</p>
        <p>Shipping Date: {new Date(item.date).toLocaleDateString()}</p>
      </div>
      <div className="mt-4">
        <Link
          to={`/item/${id}/edit`}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Edit
        </Link>
        <button
          onClick={deleteItem}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;
