import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Check if KV is available
        let kv;
        try {
            const kvModule = await import('@vercel/kv');
            kv = kvModule.kv;
        } catch (error) {
            return res.status(503).json({
                error: 'Vercel KV not configured',
                message: 'Please set up Vercel KV in your dashboard: https://vercel.com/dashboard → Storage → Create KV Database',
                fallback: 'Using localStorage for now'
            });
        }

        if (req.method === 'GET') {
            // Load CMS data
            const data = await kv.get('baxishlimedia-cms-data');

            if (!data) {
                return res.status(404).json({ error: 'No data found' });
            }

            return res.status(200).json(data);
        }

        if (req.method === 'POST') {
            // Save CMS data
            const newData = req.body;

            if (!newData) {
                return res.status(400).json({ error: 'No data provided' });
            }

            await kv.set('baxishlimedia-cms-data', newData);

            return res.status(200).json({ success: true, message: 'Data saved successfully' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}
