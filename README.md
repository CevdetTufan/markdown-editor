# MarkdownForge

![MarkdownForge Preview](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

**MarkdownForge** is a beautiful, premium, and fully browser-based Markdown editor and viewer. It is designed to work entirely client-side without any back-end requirements, databases, or build steps. Just open the HTML file, and you are ready to write.

## ✨ Features

- 🌓 **Light & Dark Theme**: Premium, carefully crafted color palettes for both light and dark modes with a simple toggle.
- ⚡ **Live Preview**: See your Markdown rendered to HTML in real-time as you type.
- 🎨 **Syntax Highlighting**: Beautiful code blocks powered by `highlight.js`.
- 🛡️ **Secure**: Markdown output is sanitized using `DOMPurify` to prevent XSS vulnerabilities.
- ↔️ **Resizable Panes**: Dynamically adjust the width of the editor and preview areas to suit your workflow.
- 💾 **Auto-Save**: Never lose your progress. Your document is automatically saved to your browser's `localStorage`.
- 📥 **Download & Export**: Download your work as a `.md` file directly to your device or copy the generated HTML with one click.
- 🚀 **Zero Installation**: Built with Vanilla HTML, CSS, and JS using CDN libraries. No `npm install`, Node.js, or complex setups required.

## 🛠️ Built With

- **HTML5 & CSS3**: With modern flexbox layouts and CSS variables.
- **Vanilla JavaScript**: Pure, lightweight logic.
- [Marked.js](https://marked.js.org/): For fast and accurate Markdown parsing.
- [DOMPurify](https://github.com/cure53/DOMPurify): For robust XSS sanitization.
- [Highlight.js](https://highlightjs.org/): For code syntax highlighting.
- [FontAwesome](https://fontawesome.com/): For clean and scalable UI icons.
- **Google Fonts**: Inter & Fira Code for a premium typographic experience.

## 🚀 Getting Started

### Running Locally
1. Clone this repository or download the ZIP file.
   ```bash
   git clone https://github.com/yourusername/markdown-editor.git
   ```
2. Navigate to the folder.
3. Simply double-click on `index.html` to open it in your default web browser.

### Hosting on GitHub Pages
Because MarkdownForge requires no build steps, it is perfectly suited for **GitHub Pages**.
1. Push this repository to your GitHub account.
2. Go to your repository **Settings**.
3. Navigate to the **Pages** section on the left sidebar.
4. Under "Build and deployment", select the `main` branch as your source.
5. Save, and your editor will be live and accessible from anywhere!

## 📝 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to fork, modify, and use it in your own projects!
