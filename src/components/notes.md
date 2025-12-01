I tried 6223 and got back:

That's not the right answer; your answer is too high. Curiously, it's the right answer for someone else; you might be logged in to the wrong account or just unlucky. In any case, you need to be using your puzzle input. If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. [Return to Day 1]

Here is a bug:

- The dial is rotated R78 to point at 78.
  (Total times at 0 so far: 296)
- The dial is rotated L769 to point at 9; during this rotation, it points at 0 8 times.
  (Total times at 0 so far: 304)

The bug was that I had `const newDial = (currentDial - parsedInput.value) % 100;` instead of `const newDial = currentDial - (parsedInput.value % 100);`;

I figured it out by console logging alot :)
