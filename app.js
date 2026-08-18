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

async function downloadPDF() {
    const preview = document.getElementById("preview");
    const downloadButton = document.getElementById("downloadBtn");

    const exportHost = document.createElement("div");
    exportHost.className = "pdf-export-host";

    const exportElement = preview.cloneNode(true);
    exportElement.removeAttribute("id");
    exportElement.classList.add("pdf-export");

    exportHost.appendChild(exportElement);
    document.body.appendChild(exportHost);

    downloadButton.disabled = true;
    downloadButton.textContent = "Preparing your pattern…";

    await new Promise(resolve => requestAnimationFrame(resolve));

    const images = Array.from(exportElement.querySelectorAll("img"));
    await Promise.all(images.map(image => {
        if (image.complete) return Promise.resolve();

        return new Promise(resolve => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
        });
    }));

    const options = {
        margin: [0.55, 0.5, 0.55, 0.5],
        filename: "ohitswool-custom-bolero.pdf",
        pagebreak: {
            mode: ["css", "legacy"],
            avoid: [
                "table",
                ".pattern-brand",
                ".pattern-instruction-block",
                ".pattern-diagram-placeholder",
                ".pattern-note"
            ]
        },
        image: {
            type: "jpeg",
            quality: 0.98
        },
        html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#fffdf9",
            scrollX: 0,
            scrollY: 0
        },
        jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "portrait"
        }
    };

    try {
        await html2pdf()
            .set(options)
            .from(exportElement)
            .save();
    } catch (error) {
        console.error("Unable to generate the pattern PDF:", error);
        window.alert("The PDF could not be created. Please try again.");
    } finally {
        exportHost.remove();
        downloadButton.disabled = false;
        downloadButton.innerHTML = "Download your pattern <span aria-hidden=\"true\">↓</span>";
    }
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
