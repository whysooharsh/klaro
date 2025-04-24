import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg p-6">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">Order Confirmed!</h2>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="text-gray-900 font-medium">#ORDER123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900">Next Steps</h3>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>• You will receive an order confirmation email shortly</li>
              <li>• You can track your order status in your profile</li>
              <li>• Expected delivery within 3-5 business days</li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
            <Link
              to="/profile"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 