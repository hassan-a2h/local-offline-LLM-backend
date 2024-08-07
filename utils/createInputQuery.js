function createOllamaQuery(input) {
  return {
    model: "dolphin-llama3",
    messages: [{ role: "user", content: `${input}` }],
    stream: false,
  };
}

module.exports = createOllamaQuery;
