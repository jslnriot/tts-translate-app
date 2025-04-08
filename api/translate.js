if (process.env.NODE_ENV !== 'production') {
    (async () => {
        const dotenv = await import('dotenv')
        dotenv.config()
    })()
}

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ error: "Method not allowed "})
    }

    const {text, target} = req.body;

    if (!text || !target) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const libreTranslateUrl = `https://libretranslate.com/translate`

    try {
        const response = await fetch(libreTranslateUrl, {
            method: 'POST',
            body: JSON.stringify({
              q: text,
              source: "en",
              target,
              api_key: 'fdasfdsafsafe'
            }),
            headers: { "Content-Type": "application/json" }
          })
          const responseData = await response.json();

          if (!response.ok) {
            const errorText = await response;
            return res.status(response.status).json({ error: errorText})
          }

          return res.status(200).json(data(responseData));
    } catch (error) {
        console.error('Error in API call: ', error);
        res.status(500).json({ error: "Internal server error" })
    }




    // return res.status(200).json({
    //     message: "hello world"
    // })
}