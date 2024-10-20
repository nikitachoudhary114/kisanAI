import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const llm = new ChatGroq({
    apiKey: process.env.API_KEY,
    model: "llama-3.1-70b-versatile"
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a farm management assistant AI. Your job is to help farmers predict the crop yield based on the provided data. The farmer will input information such as crop type, crop year, season, state, area of land, production, annual rainfall, fertilizer usage, and pesticide usage. Based on this data, calculate and provide an estimated 'Yield' (production per area). Use the knowledge from historical agricultural data and relevant trends to predict the yield. Respond with only the yield."],
    ["human", "{input}"]
]);

export async function POST(req) {
    try {
        const {
            cropType,
            cropYear,
            season,
            state,
            area,
            production,
            annualRainfall,
            fertilizerUsage,
            pesticideUsage,
        } = await req.json();

        // Construct the input string from the received fields
        const input = `
            Crop Type: ${cropType}
            Crop Year: ${cropYear}
            Season: ${season}
            State: ${state}
            Area: ${area} acres
            Production: ${production}
            Annual Rainfall: ${annualRainfall} mm
            Fertilizer Usage: ${fertilizerUsage}
            Pesticide Usage: ${pesticideUsage}
        `;

        

        const chain = prompt.pipe(llm);
        const result = await chain.invoke({ input });
       

        return new Response(JSON.stringify({ recommendedYield: result.content }), { status: 200 });
    } catch (error) {
        console.error("Error in processing request:", error);
        return new Response(JSON.stringify({ error: 'An error occurred while fetching the recommendation.' }), { status: 500 });
    }
}
