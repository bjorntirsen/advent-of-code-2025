I tried 11323661305 and got back:

That's not the right answer; your answer is too high. If you're stuck, make sure you're using the full input data; there are also some general tips on the about page, or you can ask for hints on the subreddit. Please wait one minute before trying again. [Return to Day 2]

Going to check for bugs...

This looks like a bug:

- 2-23 has 10 invalid IDs, 2 and 3 and 4 and 5 and 6 and 7 and 8 and 9 and 11 and 22.

Looks like the problem is that it is counting single digit numbers as invalid. I need to add a check for that.

So here is the bug:

const idArray = numberToDigitsArray(id)
// If all digits are the same, it's invalid
if (idArray.every((digit) => digit === idArray[0])) {
return true
}

I should be able to add an early exit like this:
if (id < 10) return false

It worked!
