function makeEven(number) {
    const rounded = Math.round(number);
    return rounded % 2 === 0 ? rounded : rounded + 1;
}

function calculatePattern(inputs) {
    const bust = inputs.bust;
    const shoulder = inputs.shoulder;
    const gauge = inputs.gauge;

    const stitchesPerCm = gauge / 10;

    // Simple test formulas.
    // Later we replace these with your real ones.
    const A = makeEven(bust * stitchesPerCm * 0.38);

    const O = makeEven(3 * 2.3);

    const P = makeEven(
        ((((bust / 2) - shoulder) / 2) / 1.5 - 3) / 2
    );

    const S = makeEven(shoulder * stitchesPerCm * 0.8);

    return {
        bust,
        shoulder,
        gauge,
        A,
        O,
        P,
        S
    };
}