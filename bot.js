
// spam detection logic
const userMessages = new Map();

bot.on('message', async (msg) => {
  const userId = msg.from.id;
  const now = Date.now();

  if (!userMessages.has(userId)) {
    userMessages.set(userId, []);
  }

  const times = userMessages.get(userId);
  times.push(now);

  // keep only messages from last 5 seconds
  const recent = times.filter(t => now - t < 5000);
  userMessages.set(userId, recent);

  if (recent.length >= 3) {
    await telegram_call('send_reaction', {
      message_id: msg.message_id,
      emoji: '⚡'
    });
  }
});
