'use client';

import { useState } from 'react';

const YieldProduction = () => {
    const [formData, setFormData] = useState({
        crop: '',
        season: '',
        state: '',
        area: '',
        rainfall: '',
        fertilizer: '',
        pesticides: '',
    });

    const [yieldResult, setYieldResult] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Placeholder logic for yield calculation (update as needed)
        const yieldCalculation = parseFloat(formData.area) * parseFloat(formData.rainfall) * 0.05;

        setYieldResult(`Estimated yield for ${formData.crop} in ${formData.season}: ${yieldCalculation.toFixed(2)} tons`);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200 ">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Crop Yield Prediction</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="crop" className="block text-sm font-medium text-gray-700">Crop:</label>
                    <input
                        type="text"
                        id="crop"
                        name="crop"
                        value={formData.crop}
                        onChange={handleChange}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="season" className="block text-sm font-medium text-gray-700">Season:</label>
                    <input
                        type="text"
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area (in hectares):</label>
                    <input
                        type="number"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700">Annual Rainfall (in mm):</label>
                    <input
                        type="number"
                        id="rainfall"
                        name="rainfall"
                        value={formData.rainfall}
                        onChange={handleChange}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="fertilizer" className="block text-sm font-medium text-gray-700">Fertilizer (in kg):</label>
                    <input
                        type="number"
                        id="fertilizer"
                        name="fertilizer"
                        value={formData.fertilizer}
                        onChange={handleChange}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="pesticides" className="block text-sm font-medium text-gray-700">Pesticides (in liters):</label>
                    <input
                        type="number"
                        id="pesticides"
                        name="pesticides"
                        value={formData.pesticides}
                        onChange={handleChange}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
                    Predict Yield
                </button>
            </form>

            {yieldResult && (
                <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-md">
                    <p className="text-green-700 font-semibold">{yieldResult}</p>
                </div>
            )}
        </div>
    );
};

export default YieldProduction;
