
# Olympic Weightlifting Weight Cut Calculator

## Deploying to SquareSpace

SquareSpace has limited support for custom React applications. Here are your best options:

---

### Option 1: Embed via iframe (Recommended)

**Step 1: Deploy to a free hosting service**

Deploy this app to one of these free platforms:

| Platform | How to Deploy |
|----------|---------------|
| **Vercel** | 1. Push code to GitHub<br>2. Go to [vercel.com](https://vercel.com)<br>3. Import your GitHub repo<br>4. Click "Deploy" |
| **Netlify** | 1. Go to [netlify.com](https://netlify.com)<br>2. Drag & drop your project folder<br>3. Get your URL |
| **GitHub Pages** | 1. Push to GitHub<br>2. Settings → Pages → Enable |

**Step 2: Embed in SquareSpace**

1. In SquareSpace, edit the page where you want the calculator
2. Add a **Code Block** (or **Embed Block**)
3. Paste this code (replace `YOUR-APP-URL` with your deployed URL):

```html
<div style="width: 100%; max-width: 1200px; margin: 0 auto;">
  <iframe 
    src="https://YOUR-APP-URL.vercel.app" 
    style="width: 100%; height: 2000px; border: none; border-radius: 16px;"
    title="Weight Cut Calculator"
  ></iframe>
</div>
```

4. Adjust the `height` value as needed (2000px works for most screens)

---

### Option 2: SquareSpace Code Injection (Advanced)

This method is **not recommended** for complex React apps because:
- SquareSpace's code injection has size limits
- React apps require module bundling
- Conflicts with SquareSpace's own JavaScript

If you must use this method, you'd need to:
1. Bundle the app using Vite/Webpack into a single JS file
2. Inject via Settings → Advanced → Code Injection

---

### Option 3: Link to External Page

Simply host the calculator on Vercel/Netlify and link to it:

1. Deploy to Vercel/Netlify (see Option 1)
2. In SquareSpace, add a **Button Block**
3. Link to your deployed calculator URL
4. Style the button to match your site

---

## Quick Deploy to Vercel (Easiest Method)

1. Create a free account at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm install -g vercel`
3. In your project folder, run: `vercel`
4. Follow the prompts
5. Copy your live URL and use it in the iframe embed above

---

## Customizing for Your Brand

Before deploying, you can customize colors in `src/App.css`:

```css
/* Primary accent color (currently red/pink) */
--accent-color: #e94560;

/* Dark background color */
--dark-bg: #1a1a2e;
```

Search for `#e94560` and `#1a1a2e` across all CSS files to update your brand colors.

---

## Need Help?

If you're not comfortable with deployment, consider:
1. Hiring a developer on Fiverr/Upwork for ~$20-50
2. Using SquareSpace's built-in forms (limited functionality)
3. Reaching out to a SquareSpace Expert

---

## File Structure for Deployment

```
your-project/
├── index.html          ← Entry point
├── src/
│   ├── index.tsx       ← React entry
│   ├── App.tsx         ← Main component
│   └── ...             ← Other components
└── README.md           ← This file
```

The app is ready to deploy as-is to Vercel or Netlify!
