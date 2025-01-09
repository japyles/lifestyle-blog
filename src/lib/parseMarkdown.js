export function parseMarkdown(text) {
  // Replace **bold** with <strong>bold</strong>
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Replace __underline__ with <u>underline</u>
  text = text.replace(/__(.*?)__/g, '<u>$1</u>');
  
  // Split into paragraphs (double line breaks)
  const paragraphs = text.split(/\n\n+/);
  
  // Wrap each paragraph in <p> tags, preserving single line breaks
  // and adding header tags for section titles
  return paragraphs.map(para => {
    if (para.trim().endsWith(':')) {
      return `<h2 class="text-2xl font-bold mt-6 mb-4">${para}</h2>`;
    } else {
      return `<p>${para.replace(/\n/g, '<br>')}</p>`;
    }
  }).join('\n\n');
}




// export function parseMarkdown(text) {
//     // Replace **bold** with <strong>bold</strong>
//     text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
//     // Replace __underline__ with <u>underline</u>
//     text = text.replace(/__(.*?)__/g, '<u>$1</u>');
    
//     // Replace single line breaks with <br> tags
//     text = text.replace(/(?<!\n)\n(?!\n)/g, '<br>');
    
//     // Split into paragraphs (double line breaks)
//     return text.split(/\n\n+/).map((paragraph) => `<p>${paragraph}</p>`).join('');
//   }
  
  