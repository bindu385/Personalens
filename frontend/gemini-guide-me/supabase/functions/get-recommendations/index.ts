import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { category, answers, country } = await req.json();
    console.log('Generating recommendations for:', { category, country, answerCount: Object.keys(answers).length });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build context-aware prompt based on category
    const systemPrompt = `You are a knowledgeable health and wellness expert specializing in product recommendations. 
Generate personalized recommendations for ${category} products based on user questionnaire responses.
Consider the user's country (${country}) for product availability and cultural preferences.
Provide 3-5 SPECIFIC product recommendations with actual brand names and product links.
Include real, purchasable products from reputable brands available in ${country}.`;

    const userPrompt = `Based on the following user information, recommend ${category} products:

Country: ${country}
Category: ${category}

User Responses:
${Object.entries(answers).map(([question, answer]) => `- ${question}: ${answer}`).join('\n')}

Please provide 3-5 SPECIFIC product recommendations with REAL brand names and product links. For each recommendation include:
1. Exact product name and brand (e.g., "Garden of Life Vitamin Code Women")
2. Where to buy with a direct link (Amazon, local retailers, brand website)
3. Key benefits for this user's specific needs
4. Why it matches their profile
5. Recommended usage and dosage

Be specific - use real brands that are actually available in ${country}. Include clickable purchase links wherever possible.
Format as a clear, well-structured response with proper formatting.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const recommendations = data.choices[0].message.content;

    console.log('Successfully generated recommendations');

    return new Response(
      JSON.stringify({ recommendations }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-recommendations:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});