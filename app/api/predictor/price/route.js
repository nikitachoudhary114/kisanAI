import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';

const llm = new ChatGroq({
    apiKey: process.env.API_KEY,
    model: "llama-3.1-70b-versatile"
});

const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are a market analysis assistant AI. Your job is to help farmers predict the price of crops based on the provided data. The farmer will input information such as crop type, area of land, fertilizer usage, pesticide usage, season, state, and additional query information. Based on this data, analyze the current market trends and provide an estimated price (per quintal) for the specified crop. Use knowledge from historical agricultural price data and relevant market analysis to make the prediction. Respond with only the estimated price.`],
    ["human", "{input}"]
]);

export async function POST(req) {
    try {
        // Destructure the incoming request to get multiple parameters
        const { cropType, area, fertilizerUsage, pesticideUsage, season, state, query } = await req.json();

        

        // Combine the inputs into a single string for processing
        const input = `
            Crop Type: ${cropType}
            Area of Land: ${area}
            Fertilizer Usage: ${fertilizerUsage}
            Pesticide Usage: ${pesticideUsage}
            Season: ${season}
            State: ${state}
            Additional Info: ${query}
        `;

        const chain = prompt.pipe(llm);
        const result = await chain.invoke({ input });

        
        return new Response(JSON.stringify({ recommendedPrice: result.content }), { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ error: 'An error occurred while fetching the recommendation.' }), { status: 500 });
    }
}
