**Reentrancy**
I tried to use as many modifiers and require statements as possible. I don't think any functions can be called from an unexpected address, and if so it won't be able to make any state changes. 


**Integer Overflow and Underflow**
Here I used SafeMath in order to aviod these kinds of issues. 


**DoS with (Unexpected) revert**

Initially I wanted to make push payments as it would be more automatic and give a better user experience. But in light of this potential attack I changed my pattern to pull payments instead, where developers have to withdraw their own money.


**Forcibly Sending Ether to a Contract**

Used the fallback function to protect the contract from this.
