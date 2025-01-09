export function parseMarkdown(text) {
    // Replace **bold** with <strong>bold</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace __underline__ with <u>underline</u>
    text = text.replace(/__(.*?)__/g, '<u>$1</u>');
    
    // Replace single line breaks with <br> tags
    text = text.replace(/(?<!\n)\n(?!\n)/g, '<br>');
    
    // Split into paragraphs (double line breaks)
    return text.split(/\n\n+/).map((paragraph) => `<p>${paragraph}</p>`).join('');
  }
  
  