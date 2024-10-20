"use client";

import { useState } from 'react';

const YieldRecommendationForm = () => {
    const [cropType, setCropType] = useState('');
    const [cropYear, setCropYear] = useState('');
    const [season, setSeason] = useState('');
    const [state, setState] = useState('');
    const [area, setArea] = useState('');
    const [production, setProduction] = useState('');
    const [annualRainfall, setAnnualRainfall] = useState('');
    const [fertilizerUsage, setFertilizerUsage] = useState('');
    const [pesticideUsage, setPesticideUsage] = useState('');
    const [recommendedYield, setRecommendedYield] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setRecommendedYield('');

        try {
            const response = await fetch('/api/predictor/yield', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cropType,
                    cropYear,
                    season,
                    state,
                    area,
                    production,
                    annualRainfall,
                    fertilizerUsage,
                    pesticideUsage,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recommendation');
            }

            const data = await response.json();

            if (data.recommendedYield) {
                setRecommendedYield(data.recommendedYield);
            } else {
                setRecommendedYield('No recommendation received.');
            }
        } catch (error) {
            setRecommendedYield(`Error: ${error.message}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Yield Recommendation</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="cropType" className="block text-gray-700 font-semibold mb-2">Crop Type:</label>
                    <input
                        type="text"
                        id="cropType"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        placeholder="e.g., Wheat, Rice"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cropYear" className="block text-gray-700 font-semibold mb-2">Crop Year:</label>
                    <input
                        type="text"
                        id="cropYear"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={cropYear}
                        onChange={(e) => setCropYear(e.target.value)}
                        placeholder="e.g., 2024"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="season" className="block text-gray-700 font-semibold mb-2">Season:</label>
                    <input
                        type="text"
                        id="season"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={season}
                        onChange={(e) => setSeason(e.target.value)}
                        placeholder="e.g., Kharif, Rabi"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">State:</label>
                    <input
                        type="text"
                        id="state"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="e.g., Punjab, Haryana"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="area" className="block text-gray-700 font-semibold mb-2">Area of Land (in acres):</label>
                    <input
                        type="number"
                        id="area"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g., 10"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="production" className="block text-gray-700 font-semibold mb-2">Production:</label>
                    <input
                        type="number"
                        id="production"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={production}
                        onChange={(e) => setProduction(e.target.value)}
                        placeholder="e.g., 2000"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="annualRainfall" className="block text-gray-700 font-semibold mb-2">Annual Rainfall (in mm):</label>
                    <input
                        type="number"
                        id="annualRainfall"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={annualRainfall}
                        onChange={(e) => setAnnualRainfall(e.target.value)}
                        placeholder="e.g., 800"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fertilizerUsage" className="block text-gray-700 font-semibold mb-2">Fertilizer Usage:</label>
                    <input
                        type="text"
                        id="fertilizerUsage"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={fertilizerUsage}
                        onChange={(e) => setFertilizerUsage(e.target.value)}
                        placeholder="e.g., NPK 15-15-15"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="pesticideUsage" className="block text-gray-700 font-semibold mb-2">Pesticide Usage:</label>
                    <input
                        type="text"
                        id="pesticideUsage"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={pesticideUsage}
                        onChange={(e) => setPesticideUsage(e.target.value)}
                        placeholder="e.g., Insecticide"
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
            {recommendedYield && (
                <p className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-center text-lg">
                    <strong>Recommended Yield:</strong> {recommendedYield}
                </p>
            )}
        </div>
    );
};

export default YieldRecommendationForm;
