let patternTemplate = "";

async function loadPatternTemplate() {
    const response = await fetch("pattern.md");
    patternTemplate = await response.text();
    updatePreview();
}

function getInputs() {
    const gaugeAcrossSts = Number(document.getElementById("gaugeAcrossSts").value);
    const gaugeAcrossCm = Number(document.getElementById("gaugeAcrossCm").value);

    const gaugeDownRows = Number(document.getElementById("gaugeDownRows").value);
    const gaugeDownCm = Number(document.getElementById("gaugeDownCm").value);

    return {
        bust: Number(document.getElementById("bust").value),
        shoulder: Number(document.getElementById("shoulder").value),
        armhole: Number(document.getElementById("armhole").value),
        upperArm: Number(document.getElementById("upperArm").value),

        gaugeAcrossSts,
        gaugeAcrossCm,
        gaugeDownRows,
        gaugeDownCm,

        gaugeAcross: gaugeAcrossSts / gaugeAcrossCm,
        gaugeDown: gaugeDownRows / gaugeDownCm
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

[
    "bust",
    "shoulder",
    "armhole",
    "upperArm",
    "gaugeAcrossSts",
    "gaugeAcrossCm",
    "gaugeDownRows",
    "gaugeDownCm"
].forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener("input", updatePreview);
    }
});

document.getElementById("downloadBtn").addEventListener("click", downloadPDF);

loadPatternTemplate();