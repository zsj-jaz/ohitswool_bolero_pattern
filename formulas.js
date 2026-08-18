function makeEven(number) {
    const rounded = Math.round(number);
    return rounded % 2 === 0 ? rounded : rounded + 1;
}

function makeOdd(number) {
    const rounded = Math.round(number);
    return rounded % 2 !== 0 ? rounded : rounded + 1;
}

function calculatePattern(inputs) {
    const bust = inputs.bust;
    const shoulder = inputs.shoulder;
    const armhole = inputs.armhole;
    const upperArm = inputs.upperArm;

    const stitchesPerCm = inputs.gaugeAcross;
    const rowsPerCm = inputs.gaugeDown;

    const A = Math.round(((shoulder * stitchesPerCm) - 30) / 2);

    // TODO: Replace these placeholder values with the correct calculations.
    const B = makeEven(rowsPerCm * 2);
    const C = makeEven(rowsPerCm * 1.5);
    const D = makeOdd(rowsPerCm * 1);
    const DPlusOne = D + 1;
    const E = 0;

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
        B,
        C,
        D,
        DPlusOne,
        E,
        S
    };
}
