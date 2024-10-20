import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const llm = new ChatGroq({
    apiKey: "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",
    model: "llama-3.1-70b-versatile"
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a crop advisory assistant AI. Your job is to help farmers decide which crop to plant based on the provided data. The farmer will input information such as state, district, soil type, season, area of land, annual rainfall, temperature range, and available resources. Based on this data, analyze the local agricultural conditions and market demand to recommend the most suitable crop for planting. Respond with only the recommended crop name."],
    ["human", "{input}"]
]);

export async function POST(req) {
    try {
        const {
            state,
            district,
            soilType,
            season,
            area,
            annualRainfall,
            temperatureRange,
            resources,
        } = await req.json();

        // Construct the input string from the received fields
        const input = `
            State: ${state}
            District: ${district}
            Soil Type: ${soilType}
            Season: ${season}
            Area: ${area} acres
            Annual Rainfall: ${annualRainfall} mm
            Temperature Range: ${temperatureRange}
            Available Resources: ${resources}
        `;

        const chain = prompt.pipe(llm);
        const result = await chain.invoke({ input });

        return new Response(JSON.stringify({ recommendedCrop: result.content }), { status: 200 });
    } catch (error) {
        console.error("Error in processing request:", error);
        return new Response(JSON.stringify({ error: 'An error occurred while fetching the recommendation.' }), { status: 500 });
    }
}
