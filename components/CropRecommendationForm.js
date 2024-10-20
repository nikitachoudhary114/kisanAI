"use client";

import { useState } from 'react';

const CropRecommendationForm = () => {
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [soilType, setSoilType] = useState('');
    const [season, setSeason] = useState('');
    const [area, setArea] = useState('');
    const [annualRainfall, setAnnualRainfall] = useState('');
    const [temperatureRange, setTemperatureRange] = useState('');
    const [resources, setResources] = useState('');
    const [recommendedCrop, setRecommendedCrop] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRecommendedCrop('');

        try {
            const response = await fetch('/api/predictor/crop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state, district, soilType, season, area, annualRainfall, temperatureRange, resources }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recommendation');
            }

            const data = await response.json();

            if (data.recommendedCrop) {
                setRecommendedCrop(data.recommendedCrop);
            } else {
                setRecommendedCrop('No recommendation received.');
            }
        } catch (error) {
            setRecommendedCrop(`Error: ${error.message}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Crop Recommendation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700" htmlFor="state">State</label>
                    <input
                        id="state"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700" htmlFor="district">District</label>
                    <input
                        id="district"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700" htmlFor="soilType">Soil Type</label>
                    <input
                        id="soilType"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700" htmlFor="season">Season</label>
                    <input
                        id="season"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700" htmlFor="area">Area (in acres)</label>
                    <input
                        id="area"
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700" htmlFor="annualRainfall">Annual Rainfall (in mm)</label>
                    <input
                        id="annualRainfall"
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={annualRainfall}
                        onChange={(e) => setAnnualRainfall(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700" htmlFor="temperatureRange">Temperature Range (e.g., 20-30°C)</label>
                    <input
                        id="temperatureRange"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={temperatureRange}
                        onChange={(e) => setTemperatureRange(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700" htmlFor="resources">Available Resources</label>
                    <input
                        id="resources"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={resources}
                        onChange={(e) => setResources(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Fetching...' : 'Get Recommendation'}
                </button>
            </form>
            {recommendedCrop && (
                <p className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center text-lg">
                    <strong>Recommended Crop:</strong> {recommendedCrop}
                </p>
            )}
        </div>
    );
};

export default CropRecommendationForm;
