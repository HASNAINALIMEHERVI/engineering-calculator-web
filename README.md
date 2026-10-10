# Engineering Calculator Web

A personal educational web project by **Hasnain Ali Mehervi (Sunny)**, an Electronics Engineering student and creator of Sunny Web Studio. Reworked from my uploaded single-file math calculator; this version uses a smaller, validated set of calculations rather than claiming every original feature is complete.

## Features

- 14 operations covering arithmetic, real square roots, radians-based sine, logarithms, bounded factorials, population statistics, ideal resistive circuits, determinants and linear systems.
- Responsive interface, explicit labels, keyboard form submission and accessible result announcements.
- Square matrices from 2×2 to 8×8, Gaussian elimination with partial pivoting, and rejection of singular or numerically unreliable systems.
- Empty, malformed, non-finite and unsupported inputs produce clear errors. No dynamic expression evaluation.

## Run

Open `index.html` in a browser. No installation, API key or server is required.

For mathematical regression checks with Node.js:

```sh
node tests/math.test.js
```

## Rework and scope

The source prototype contained AI and guaranteed-accuracy claims, an advertising script, unrelated contact details, broken navigation and matrix input bugs. Those were removed. The page does not use AI, analytics, external services or persistent storage. Original conversion, number-property and other unfinished functions are deliberately outside this version's scope.

This is personal/demo work, not a paid client case study. JavaScript floating-point calculations have rounding and overflow limits. The solver does not distinguish infinite solutions from inconsistent systems and is not a replacement for a scientific numerical package. Ideal-resistor formulas do not model practical hardware. Independently verify results for coursework or engineering use.

## Validation

34 mathematical checks cover domain errors, blank/malformed data, overflow-related input limits, circuit formulas, determinants, pivot swaps and solution residuals for systems of size 2–8. Automated mathematical checks do not establish compatibility with every browser or screen reader.
