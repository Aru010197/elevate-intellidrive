import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

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

    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY is missing');
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('Generating AI insight for query:', query);

    // Test response first to see if basic function works
    const testInsight = `📊 **Test AI Insight for "${query}"**

**Current Platform Overview:**
- Total AUM: ₹5.2 Cr (19% YoY growth)  
- Active Users: 41 investors
- Top Performer: Sarah Parker (₹3.7 Cr AUM)

**Key Recommendations:**
🎯 Focus on expanding high-value client base
📈 Leverage current growth momentum for new product launches
⚠️ Monitor market volatility impacts on portfolio performance

*This is a test response while Gemini integration is being configured.*`;

    console.log('Successfully generated test insight');

    return new Response(JSON.stringify({ insight: testInsight }), {
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