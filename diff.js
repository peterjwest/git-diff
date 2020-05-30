import JsDiff from 'diff';
import { readFile } from 'fs/promises';
import colors from 'colors/safe.js';

function reverse(string) {
    return string.split("").reverse().join("");
}

function diffWordsBackwards(a, b) {
    const wordGroups = JsDiff.diffWordsWithSpace(reverse(a), reverse(b));
    wordGroups.reverse();
    return wordGroups.map((group) => {
        return { ...group, value: reverse(group.value) };
    });
}


function areSimilar(wordGroups) {
    return wordGroups.find((group) => {
        if (group.added || group.removed) {
            return false;
        }
        return group.value.match(/[a-zA-Z]{3,}/);
    });
}

async function main() {
    const a = (await readFile('./test.js')).toString();
    const b = (await readFile('./test2.js')).toString();
    const lineGroups = JsDiff.diffLines(a, b);

    // Find moved code
    const changedLineGroups = lineGroups.filter((group) => group.added || group.removed);
    changedLineGroups.filter((group) => group.added || group.removed).map((group) => {
        const otherGroup = changedLineGroups.find((otherGroup) => {
            return group.removed !== otherGroup.removed && group.value.trim() === otherGroup.value.trim();
        });
        if (otherGroup) {
            group.moved = otherGroup;
            otherGroup.moved = group;
        }
    });

    const colouredLines = lineGroups.map((group, i) => {
        if (group.removed) {
            if (group.moved) {
                return colors.yellow(group.value);
            }

            if (lineGroups[i + 1] && lineGroups[i + 1].added) {
                const wordGroups = JsDiff.diffWordsWithSpace(group.value, lineGroups[i + 1].value);
                const wordGroups2 = diffWordsBackwards(group.value, lineGroups[i + 1].value);
                const bestWordGroups = wordGroups2.length < wordGroups.length ? wordGroups2 : wordGroups;
                if (areSimilar(bestWordGroups)) {
                    return bestWordGroups.map((group) => {
                        if (group.removed) {
                            return colors.red.inverse(group.value);
                        }
                        if (group.added) {
                            return '';
                        }
                        return colors.red(group.value);
                    }).join('');
                }
            }
            return colors.red(group.value);
        }
        if (group.added) {
            if (group.moved) {
                return colors.blue(group.value);
            }

            if (lineGroups[i - 1] && lineGroups[i - 1].removed) {
                const wordGroups = JsDiff.diffWordsWithSpace(lineGroups[i - 1].value, group.value);
                const wordGroups2 = diffWordsBackwards(lineGroups[i - 1].value, group.value);
                const bestWordGroups = wordGroups2.length < wordGroups.length ? wordGroups2 : wordGroups;
                if (areSimilar(bestWordGroups)) {
                    return bestWordGroups.map((group) => {
                        if (group.added) {
                            return colors.green.inverse(group.value);
                        }
                        if (group.removed) {
                            return '';
                        }
                        return colors.green(group.value);
                    }).join('');
                }
            }
            return colors.green(group.value);
        }
        return group.value
    });
    console.log(colouredLines.join(""));
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
