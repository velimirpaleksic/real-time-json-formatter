const inputField = document.getElementById("json-input");
const outputField = document.getElementById("formatted-output");
const errorMessage = document.getElementById("error-message");
const indentationSelector = document.getElementById("indentation");

inputField.addEventListener("input", formatJson);
indentationSelector.addEventListener("change", formatJson);

function formatJson() {
    const input = inputField.value;
    const indentation = parseInt(indentationSelector.value);

    try {
        const json = JSON.parse(input);
        const formatted = JSON.stringify(json, null, indentation);
        outputField.innerHTML = syntaxHighlight(formatted);
        errorMessage.textContent = "";
    } catch (error) {
        outputField.textContent = "";
        errorMessage.textContent = `Error: ${error.message}`;
    }
}

function syntaxHighlight(json) {
    return json.replace(
        /("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b-?\d+(\.\d+)?([eE][+\-]?\d+)?\b)/g,
        (match) => {
        let cls = "number";
        if (/^"/.test(match)) {
            cls = /:$/.test(match) ? "key" : "string";
        } else if (/true|false/.test(match)) {
            cls = "boolean";
        } else if (/null/.test(match)) {
            cls = "null";
        }
            return `<span class="${cls}">${match}</span>`;
        }
    );
}