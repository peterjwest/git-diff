# git-diff

Attempt to display a better diff than github!

- Moved sections of code are shown in yellow/blue instead of red/green
- Changed sections of code show word-by-word diffs
- Detect unrelated sections of code and don't try to diff them!
- Additions above a change diff nicer due to reverse diffing™

Requires node 14

Run with:
```js
yarn install
node diff.js
```
