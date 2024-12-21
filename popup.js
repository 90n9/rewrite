let enhanceButton = document.getElementById("enhanceButton");
let responseBox = document.getElementById("responseBox");

enhanceButton.addEventListener("click", async () => {
  responseBox.value = 'loading';
  const clipboardText = await navigator.clipboard.readText();
  const URL = "http://localhost:11434/api/generate";
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.2",
      prompt: `Make it short and easier to understand: ${clipboardText}`,
      stream: false,
    }),
  });
  console.log({ response });

  const data = await response.json();
  console.log({ data, response: data.response });
  responseBox.value = data.response;
});
