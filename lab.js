let messages = {
  kayla: [
    ["receiver", "this is a response to the test", true, 123456235],
    ["sender", "this is a test", true, 123456235],
    ["sender", "this", true, 123456235],
    ["receiver", "hi", true, 123456235],
    ["receiver", "how are you", true, 123456235],
    ["sender", "howdddddddddddddddddddddddddddddddddddddddd", true, 123456235],
    ["sender", "You wanna grab a coffee sometime next week ", true, 123456235]
  ],
  dawn: [
    ["sender", "how was the book i gave you", true, 123456235],
    ["receiver", "how was the book i gave you", true, 123456235],
    ["receiver", "I really liked it !! ", true, 123456235],
    [
      "sender",
      "I think i will be buying that car we saw last time. ",
      true,
      123456235
    ]
  ]
};

// Counting how many messages correspond to a certain type and a certain state
const stateCount = (messages, type, state) => {
  return messages.reduce((sum, x) => {
    return (sum = x[0] === type && x[2] === state ? ++sum : sum);
  }, 0);
};

// Check if messages are more of a "sender" or "receiver" type
const msgType = (msgs, type = "sender") =>
  msgs.reduce((sum, x) => (sum = x[0] === type ? ++sum : --sum), 0);

// Changing the state of messages from read (state=true) to unread (state=false) and vice versa
const stateChange = (messages, type, state) => {
  return messages.map(x => (x = x[0] === type ? [x[0], x[1], state] : x));
};
console.log(msgType(messages["dawn"], "receiver"));
