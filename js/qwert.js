var addTwoNumbers = function(l1, l2) {
    l1 = l1.reverse().join('');
    l2 = l2.reverse().join('');
    return String((Number(l1)+Number(l2))).split('').reverse()
};
l1 = [9,9,9,9,9,9,9]; 
l2 = [9,9,9,9]
console.log(addTwoNumbers(l1, l2))