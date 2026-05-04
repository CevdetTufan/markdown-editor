document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    const btnCopy = document.getElementById('btn-copy');
    const btnDownload = document.getElementById('btn-download');
    const btnClear = document.getElementById('btn-clear');
    
    // --- Initialize Marked.js with Highlight.js ---
    marked.setOptions({
        highlight: function (code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
        gfm: true,
        breaks: true,
    });

    // --- Core Functions ---
    const renderMarkdown = () => {
        const markdownText = editor.value;
        // Parse markdown to HTML
        const rawHtml = marked.parse(markdownText);
        // Sanitize HTML to prevent XSS
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        // Render in preview
        preview.innerHTML = cleanHtml;
        // Save to local storage
        localStorage.setItem('markdown-forge-content', markdownText);
    };

    const showNotification = (message, isError = false) => {
        // Remove existing notification if any
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notif = document.createElement('div');
        notif.className = 'notification';
        if (isError) notif.style.backgroundColor = 'var(--danger-color)';
        notif.textContent = message;
        
        document.body.appendChild(notif);
        
        // Trigger reflow for animation
        setTimeout(() => notif.classList.add('show'), 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    };

    // --- Event Listeners ---

    // 1. Live Typing
    editor.addEventListener('input', renderMarkdown);

    // 2. Synchronized Scrolling
    editor.addEventListener('scroll', () => {
        // Calculate percentage scrolled
        const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
        // Apply percentage to preview pane
        preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
    });

    // 3. Toolbar: Copy HTML
    btnCopy.addEventListener('click', () => {
        const htmlContent = preview.innerHTML;
        navigator.clipboard.writeText(htmlContent).then(() => {
            showNotification('HTML Copied to Clipboard!');
        }).catch(err => {
            showNotification('Failed to copy text', true);
            console.error('Could not copy text: ', err);
        });
    });

    // 4. Toolbar: Download .md
    btnDownload.addEventListener('click', () => {
        const markdownText = editor.value;
        const blob = new Blob([markdownText], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('File Downloaded!');
    });

    // 5. Toolbar: Clear Editor
    btnClear.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the editor? All un-downloaded progress will be lost.')) {
            editor.value = '';
            renderMarkdown();
            showNotification('Editor cleared');
        }
    });

    // 6. Handle Tab Key in Editor
    editor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;

            // Set textarea value to: text before caret + tab + text after caret
            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

            // Put caret at right position again
            this.selectionStart = this.selectionEnd = start + 1;
            
            // Trigger render
            renderMarkdown();
        }
    });

    // 7. Resizer Logic
    const resizer = document.getElementById('resizer');
    const editorPane = document.getElementById('editor-pane');
    const mainContent = document.querySelector('.main-content');
    
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        // Prevent text selection during resize
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        
        // Calculate new width based on mouse position relative to container
        const containerRect = mainContent.getBoundingClientRect();
        let newWidth = e.clientX - containerRect.left;
        
        // Constrain width between 20% and 80%
        const minWidth = containerRect.width * 0.2;
        const maxWidth = containerRect.width * 0.8;
        
        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;
        
        // Apply new width percentage
        const widthPercentage = (newWidth / containerRect.width) * 100;
        editorPane.style.width = `${widthPercentage}%`;
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        }
    });

    // --- Initialization ---
    const init = () => {
        const savedContent = localStorage.getItem('markdown-forge-content');
        if (savedContent) {
            editor.value = savedContent;
        } else {
            // Default placeholder content
            editor.value = `# Welcome to MarkdownForge\n\nA beautiful, browser-based Markdown editor.\n\n## Features\n\n- 🌙 Premium Dark Mode\n- ⚡ Live Preview\n- 💾 Auto-saving to browser\n- 🎨 Syntax Highlighting\n- ⬇️ Download as \`.md\`\n\n### Code Example\n\n\`\`\`javascript\nconst greet = () => {\n  console.log("Hello, world!");\n};\n\`\`\`\n\n> "Simplicity is the ultimate sophistication." - Leonardo da Vinci\n`;
        }
        renderMarkdown();
    };

    init();
});
