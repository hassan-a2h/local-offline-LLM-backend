function createOllamaQuery(input) {
  return {
    model: "qwen2:0.5b",
    messages: [{ role: "user", content: `${input}` }],
    stream: false,
  };
}

module.exports = createOllamaQuery;
