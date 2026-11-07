// Shared by the lesson player, private assessment grader and ecology runner.
globalThis.RyChoiceLayout = (() => {
  function shuffle(values, random) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function hasPattern(positions) {
    const end = positions.length;
    if (end >= 3 && positions[end - 1] === positions[end - 2] &&
        positions[end - 1] === positions[end - 3]) return true;
    for (const [width, repeats] of [[2, 3], [3, 2], [4, 2]]) {
      if (end < width * repeats) continue;
      const start = end - width * repeats;
      const block = positions.slice(start, start + width);
      if (new Set(block).size < 2) continue;
      if (positions.slice(start).every((value, index) => value === block[index % width])) return true;
    }
    return false;
  }

  function positions(count, width, random) {
    const letters = Array.from({length: width}, (_, index) => index);
    const extras = shuffle(letters, random).slice(0, count % width);
    const remaining = letters.map(letter => Math.floor(count / width) + Number(extras.includes(letter)));
    const result = [];

    function fill() {
      if (result.length === count) return true;
      const choices = shuffle(letters.filter(letter => remaining[letter] > 0), random);
      for (const letter of choices) {
        result.push(letter);
        remaining[letter]--;
        const feasible = remaining.every(amount => amount <= 2 * (count - result.length - amount + 1));
        if (feasible && !hasPattern(result) && fill()) return true;
        remaining[letter]++;
        result.pop();
      }
      return false;
    }

    if (!fill()) throw new Error('Could not arrange this assessment without a repeating answer pattern.');
    return result;
  }

  function orders(questions, random = Math.random) {
    const groups = new Map();
    for (const question of questions) {
      if (!Number.isInteger(question.answer) || question.options?.length < 2 || !question.options) continue;
      const width = question.options.length;
      if (!groups.has(width)) groups.set(width, []);
      groups.get(width).push(question);
    }

    const result = {};
    for (const [width, group] of groups) {
      const slots = positions(group.length, width, random);
      group.forEach((question, index) => {
        const distractors = question.options.map((_, i) => i).filter(i => i !== question.answer);
        const order = shuffle(distractors, random);
        order.splice(slots[index], 0, question.answer);
        result[question.id] = order;
      });
    }
    return result;
  }

  return {orders, hasPattern};
})();
