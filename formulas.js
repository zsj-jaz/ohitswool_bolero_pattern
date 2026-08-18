function makeEven(number) {
    const rounded = Math.round(number);
    return rounded % 2 === 0 ? rounded : rounded + 1;
}

function calculatePattern(inputs) {
    const bust = inputs.bust;
    const shoulder = inputs.shoulder;
    const armhole = inputs.armhole;
    const upperArm = inputs.upperArm;

    const stitchesPerCm = inputs.gaugeAcross;
    const rowsPerCm = inputs.gaugeDown;

    const A = makeEven(bust * stitchesPerCm * 0.38);
    const O = makeEven(3 * rowsPerCm);

    // temporary test formulas
    const P = makeEven(
        ((((bust / 2) - shoulder) / 2) / 1.5 - 3) / 2
    );

    const S = makeEven(upperArm * stitchesPerCm);

    return {
        bust,
        shoulder,
        armhole,
        upperArm,

        gaugeAcrossSts: inputs.gaugeAcrossSts,
        gaugeAcrossCm: inputs.gaugeAcrossCm,
        gaugeDownRows: inputs.gaugeDownRows,
        gaugeDownCm: inputs.gaugeDownCm,

        gaugeAcross: stitchesPerCm.toFixed(2),
        gaugeDown: rowsPerCm.toFixed(2),

        A,
        O,
        P,
        S
    };
}