# Sanika Deshmukh - Portfolio

A beautiful, modern, and responsive portfolio website built with HTML, CSS, and JavaScript.

## Features

- ✨ **Dark/Light Mode** - Toggle between themes with smooth transitions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Beautiful Animations** - Smooth transitions and micro-interactions
- 📊 **Visitor Counter** - Track website visits (client-side)
- 📝 **Experience Timeline** - Visual showcase of work history
- 🚀 **Featured Projects** - Filterable project cards
- 💼 **Skills & Tech Stack** - Organized skill categories
- 📜 **Certifications** - Display your achievements
- 📬 **Contact Form** - Get in touch (uses Formspree for production)
- 📈 **SEO Optimized** - Meta tags, Open Graph, sitemap, robots.txt
- 📜 **Scroll Progress** - Visual indicator of scroll position
- ⬆️ **Scroll-to-Top** - Easy navigation back to top
- 📱 **Mobile Menu** - Responsive navigation for small screens

## Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- A GitHub account (for hosting)

### Local Development

1. **Open the project** in your code editor
2. **Launch a local server** - You can use:
   - VS Code's "Live Server" extension
   - Python: `python -m http.server`
   - Node.js: `npx serve`
3. **Open your browser** and navigate to `http://localhost:8000` (or the port shown)

## Customization

### Update Personal Information

1. **Edit `index.html`**:
   - Update name, title, and description in the Hero section
   - Modify Experience, Projects, Skills, and Certifications sections
   - Update social links (GitHub, LinkedIn, Naukri, etc.)

2. **Add your Resume**:
   - Place your `resume.pdf` in the `assets/` folder
   - Update the `download-resume` link in `index.html` and `script.js`

3. **Customize Colors**:
   - Edit CSS variables in `styles.css` under the `:root` selector
   - Update dark mode colors in the `[data-theme="dark"]` block

### Contact Form Setup (Production)

To make the contact form work:

1. Sign up for a free account at [Formspree](https://formspree.io/)
2. Create a new form and get your form endpoint
3. Update the form action in `index.html`:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
   ```

## Hosting on GitHub Pages

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit - Portfolio website"
```

### Step 2: Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and log in
2. Click the "+" icon and select "New repository"
3. Name your repository (e.g., `portfolio`)
4. Choose "Public" or "Private" (Public is recommended for GitHub Pages)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 3: Push to GitHub

Follow the instructions on GitHub to push your code:

```bash
git remote add origin https://github.com/sanikaDeshmukh29/portfolio.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to the **Pages** section (in the left sidebar under "Code and automation")
4. Under **Source**, select:
   - Deploy from a branch
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Click **Save**

### Step 5: Wait for Deployment

GitHub Pages will take a few minutes to deploy your site. Once it's ready, you'll see a message like:
> Your site is live at https://sanikaDeshmukh29.github.io/portfolio/

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive JavaScript
├── README.md           # This file
├── sitemap.xml         # SEO sitemap
├── robots.txt          # SEO robots file
└── assets/             # Folder for images, resume, etc.
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with variables and animations
- **JavaScript** - Interactive features (no frameworks)
- **Google Fonts** - Poppins and Playfair Display
- **GitHub Pages** - Free hosting

## Performance

This portfolio is optimized for speed and accessibility:
- Minimal dependencies
- Optimized CSS and JS
- Responsive images
- Semantic HTML for accessibility
- Fast loading times

## Future Enhancements

- [ ] Add blog section
- [ ] Integrate Google Analytics
- [ ] Add Microsoft Clarity for user behavior analytics
- [ ] Add more projects and case studies
- [ ] Implement a CMS for easy content updates

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **GitHub**: [sanikaDeshmukh29](https://github.com/sanikaDeshmukh29)
- **LinkedIn**: [Sanika Deshmukh](https://www.linkedin.com/in/sanika-deshmukh-29/)
- **Naukri**: [Sanika Deshmukh](https://www.naukri.com/mnjuser/homepage)

---

Made with ❤️ by Sanika Deshmukh
