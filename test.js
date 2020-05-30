// Nest body in conditional
function foo(a) {
    if (Math.random() > 0.5) {
        const x = 1;
        return a + x;
    }
}

// Change one part of line, adding new stuff below it
const bar = [1,2,3].map((x) => x + 2);

function wat() {
    return 1 + 2 + 3;
}

// Completely change line except one character
foo(x);

// Move one thing above another
function second(x, y) {
    return x - y;
}

function first(a, b) {
    return a + b;
}

// Split long lines into multiple lines
const looong = [[1,2],[3,4],[5,6]].map((x) => {
    return x.map((y) => y + Math.random());
});

const longString = "https://github.com/peterjwest/" +
    "git-diff/blob/master/README.md";

// Split long line, with only whitespace changes
if (Math.random() + 20 >= Math.random() * 20) {
    return [1,2,3].map((x) => x + 1);
}

// Change one line, adding new stuff above it
function lonely(a) {
    return a;
}

// Replace lines with same number of lines, but unrelated
const x = 123.456;
const y = x + 0.789;
const z = Math.max(x, y);
