async function enhanceClipboardText() {
  try {
    // อ่านข้อความจากคลิปบอร์ด
    const [clipboardItem] = await navigator.clipboard.read();
    const clipboardText = await clipboardItem.getType('text/plain').then(blob => blob.text());

    // ส่งคำขอไปยัง Ollama API
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: `ปรับปรุงข้อความต่อไปนี้: ${clipboardText}`,
        stream: false
      })
    });

    const data = await response.json();
    const enhancedText = data.response;

    // เขียนข้อความที่ปรับปรุงแล้วกลับไปยังคลิปบอร์ด
    await navigator.clipboard.writeText(enhancedText);
    alert('ข้อความในคลิปบอร์ดถูกปรับปรุงแล้ว!');
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    alert('ไม่สามารถปรับปรุงข้อความได้');
  }
}

chrome.action.onClicked.addListener((tab) => {
  enhanceClipboardText();
});
