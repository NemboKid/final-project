## Explanation:

When you change Metamask account, the website won't always notice it and still thinks you have the same account that you started with. To avoid this, please reload the page after each interaction, if you want to change account. 

I'd love to improve on my code, so please give me feedback also on the frontend and how I could've done things instead. For instance, I wanted to redrirect wrong accounts to 404 pages, but ended up with some alerts instead...

This is the first time I'm in contact with frontend development, and my website has some flaws. I'd love to get honest feedback and, if possible, alternative solutions. 

**Contract Logic and Required Conditions**

- Developers must be addded before contract start and their total weight must add up to 100%. Example: 2 developers; 1 has 40% and the other 60%.

- Developers cannot be removed when contract's active. Can only be done if it's paused or not yet started.

- Admins can do everything that the owner can do, except the owner has to put in money into the contract. The owner is also the address in the occassion of selfdestruct(owner).


