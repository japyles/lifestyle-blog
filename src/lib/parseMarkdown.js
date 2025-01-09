export function parseMarkdown(text) {
    // Replace **bold** with <strong>bold</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace __underline__ with <u>underline</u>
    text = text.replace(/__(.*?)__/g, '<u>$1</u>');
    
    // Split into paragraphs
    return text.split('\n').map((paragraph) => `<p>${paragraph}</p>`).join('');
  }
  
  