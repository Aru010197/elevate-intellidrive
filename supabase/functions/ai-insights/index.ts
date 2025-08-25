import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, platformData } = await req.json();

    if (!query) {
      throw new Error('Query is required');
    }

    console.log('Generating AI insight for query:', query);

    // Create a comprehensive system prompt for investment platform analysis
    const systemPrompt = `You are an AI analyst for Elevate Wealth Investment Platform, a sophisticated investment management system. 

Platform Context:
- Current AUM: ₹5.2 Cr with 19% YoY growth
- Total Users: 41 (up from 32)
- User Types: Investors, Wealth Partners, Admins
- Investment Types: Bonds, ICDs (Inter-Corporate Deposits), REITs
- Key Players: Sarah Parker (top wealth partner with ₹3.7 Cr AUM), Michael Johnson, Priya Sharma

Your role is to provide actionable, data-driven insights about:
1. Platform performance and growth trends
2. User behavior and engagement patterns  
3. Investment opportunity analysis
4. Risk assessment and recommendations
5. Strategic growth recommendations

Format your responses with:
- Clear headings with emoji indicators
- Key metrics and percentages
- Specific actionable recommendations
- Risk indicators when relevant
- Professional tone suitable for platform administrators

Always base insights on realistic investment platform scenarios and include specific numbers when possible.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate an insight report for: ${query}${platformData ? `\n\nAdditional Platform Data: ${JSON.stringify(platformData)}` : ''}` }
        ],
        max_completion_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to generate insight');
    }

    const data = await response.json();
    const generatedInsight = data.choices[0].message.content;

    console.log('Successfully generated AI insight');

    return new Response(JSON.stringify({ insight: generatedInsight }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-insights function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});