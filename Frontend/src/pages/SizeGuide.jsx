import React from 'react';
import { Link } from 'react-router-dom';

const SizeGuide = () => {
  const sizeCharts = [
    {
      category: "Women's Clothing",
      sizes: ["XS", "S", "M", "L", "XL"],
      measurements: {
        "Bust (inches)": [32, 34, 36, 38, 40],
        "Waist (inches)": [24, 26, 28, 30, 32],
        "Hips (inches)": [34, 36, 38, 40, 42]
      }
    },
    {
      category: "Men's Clothing",
      sizes: ["S", "M", "L", "XL", "XXL"],
      measurements: {
        "Chest (inches)": [36, 38, 40, 42, 44],
        "Waist (inches)": [30, 32, 34, 36, 38],
        "Hips (inches)": [36, 38, 40, 42, 44]
      }
    }
  ];

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Size Guide</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How to Measure</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Use a soft measuring tape</li>
          <li>Measure over bare skin or thin clothing</li>
          <li>Keep the tape measure level and snug but not tight</li>
          <li>For bust/chest: Measure around the fullest part</li>
          <li>For waist: Measure around the narrowest part</li>
          <li>For hips: Measure around the fullest part</li>
        </ol>
      </div>

      {sizeCharts.map((chart, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{chart.category}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Size</th>
                  {chart.sizes.map((size) => (
                    <th key={size} className="px-4 py-2 border-b">{size}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(chart.measurements).map(([measurement, values]) => (
                  <tr key={measurement}>
                    <td className="px-4 py-2 border-b">{measurement}</td>
                    {values.map((value, i) => (
                      <td key={i} className="px-4 py-2 border-b text-center">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="mt-8">
        <p className="text-gray-600">
          For more information, please visit our <Link to="/faq" onClick={handleLinkClick} className="text-blue-600 hover:underline">FAQ</Link> or 
          <Link to="/terms" onClick={handleLinkClick} className="text-blue-600 hover:underline ml-1">Terms of Service</Link> pages.
        </p>
      </div>
    </div>
  );
};

export default SizeGuide; 