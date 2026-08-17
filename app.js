let patternTemplate = "";

async function loadPatternTemplate() {
    const response = await fetch("pattern.md");
    patternTemplate = await response.text();
    updatePreview();
}

function getInputs() {
    return {
        bust: Number(document.getElementById("bust").value),
        shoulder: Number(document.getElementById("shoulder").value),
        gauge: Number(document.getElementById("gauge").value)
    };
}

function fillTemplate(template, values) {
    let result = template;

    for (const key in values) {
        const placeholder = new RegExp(`{${key}}`, "g");
        result = result.replace(placeholder, values[key]);
    }

    return result;
}

function updatePreview() {
    if (!patternTemplate) return;

    const inputs = getInputs();
    const values = calculatePattern(inputs);

    const filledMarkdown = fillTemplate(patternTemplate, values);

    document.getElementById("preview").innerHTML =
        marked.parse(filledMarkdown);
}

function downloadPDF() {
    const element = document.getElementById("preview");

    const options = {
        margin: 0.5,
        filename: "ohitswool-custom-bolero.pdf",
        image: {
            type: "jpeg",
            quality: 0.98
        },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "portrait"
        }
    };

    html2pdf()
        .set(options)
        .from(element)
        .save();
}

document.getElementById("bust").addEventListener("input", updatePreview);
document.getElementById("shoulder").addEventListener("input", updatePreview);
document.getElementById("gauge").addEventListener("input", updatePreview);

document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

loadPatternTemplate();