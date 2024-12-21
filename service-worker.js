async function enhanceClipboardText(clipboardText) {
  console.log({ clipboardText });
  let responseText = "";
  try {
    // อ่านข้อความจากคลิปบอร์ด
    // const [clipboardItem] = await navigator.clipboard.readText();
    // const clipboardText = await clipboardItem.getType('text/plain').then(blob => blob.text());
    // const clipboardText = window.clipboardData.getData('Text')

    // ส่งคำขอไปยัง Ollama API
    const URL = 'http://localhost:11434/api/generate'
    const response = await fetch(URL, {
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
    console.log({ response });

    const data = await response.json();
    const enhancedText = data.response;

    // เขียนข้อความที่ปรับปรุงแล้วกลับไปยังคลิปบอร์ด
    await navigator.clipboard.writeText(enhancedText);
    console.log('ข้อความในคลิปบอร์ดถูกปรับปรุงแล้ว!');
    responseText = enhancedText;
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error);
    console.log('ไม่สามารถปรับปรุงข้อความได้');
  }
  return responseText;
}

// Example of a simple user data object
const user = {
  username: 'demo-user'
};

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // 2. A page requested user data, respond with a copy of `user`
  const newClipboard = await enhanceClipboardText(message);
  sendResponse(newClipboard);
});