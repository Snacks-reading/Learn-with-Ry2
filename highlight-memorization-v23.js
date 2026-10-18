(function(){
  const q=(p,o,a,w)=>[p,o,a,w];
  const lesson=(id,title,src,teach,model,v,qs,w,connect,success,extra={})=>({id,title,src,teach,model,v,q:qs,w,connect,success,...extra});
  const source='Parent-applied highlights on the 10/9/2026 teacher newsletter • teacher-required Big 8 floating pop quizzes • Math 6th in 6th';

  const lessons=[
    lesson('math_v23_big8_memory','DO FIRST • MATH 6TH IN 6TH • Memorize the Big 8',source,
      'These eight fact families must be recalled automatically—not merely recognized: 1/2 = 0.5 = 50%; 1/3 = 0.333… = 33⅓%; 1/4 = 0.25 = 25%; 1/5 = 0.2 = 20%; 1/8 = 0.125 = 12.5%; 1/9 = 0.111… = 11⅑%; 1/10 = 0.1 = 10%; and 2/3 = 0.666… = 66⅔%. Learn them in anchors: halves and tenths first; quarters and fifths next; eighths from halving 1/4; thirds and ninths as repeating families. Use cover–recall–check: study one row, cover it, say and write both missing forms, uncover and correct, then mix the direction. A correct choice seen on screen is recognition; mastery requires no-peek production from memory.',
      'MODEL: Start with 1/4 = 0.25 = 25%. Cover the decimal and percent. Say “one fourth, twenty-five hundredths, twenty-five percent,” then write 0.25 and 25%. Reverse it: when shown 25%, produce 1/4 and 0.25. Finally connect 1/8 by halving 1/4: half of 0.25 is 0.125, and half of 25% is 12.5%.',
      [['fact family','equivalent fraction, decimal, and percent forms'],['automatic recall','producing a fact accurately without choices or notes'],['terminating decimal','a decimal that ends'],['repeating decimal','a decimal with a digit or block repeating forever'],['cover–recall–check','cover the answer, produce it, reveal it, and repair any error']],
      [
        q('Complete the family: 1/2 = ? = ?',['0.5 and 50%','0.2 and 20%','0.05 and 5%','2.0 and 200%'],0,'One half is five tenths or fifty percent.'),
        q('Complete the family: 1/4 = ? = ?',['0.25 and 25%','0.4 and 40%','0.14 and 14%','0.025 and 2.5%'],0,'One fourth is twenty-five hundredths or twenty-five percent.'),
        q('Complete the family: 1/5 = ? = ?',['0.2 and 20%','0.5 and 50%','0.15 and 15%','0.05 and 5%'],0,'One fifth is two tenths or twenty percent.'),
        q('Complete the family: 1/10 = ? = ?',['0.1 and 10%','0.01 and 1%','1.0 and 100%','0.5 and 50%'],0,'One tenth is one tenth or ten percent.'),
        q('Complete the family: 1/8 = ? = ?',['0.125 and 12.5%','0.18 and 18%','0.8 and 80%','0.0125 and 1.25%'],0,'One eighth is 0.125 or 12.5 percent.'),
        q('Complete the family: 1/3 = ? = ?',['0.333… and 33⅓%','0.3 and 3%','0.33 exactly and 33% exactly','0.13 and 13%'],0,'The threes repeat forever; 33⅓% is exact.'),
        q('Complete the family: 2/3 = ? = ?',['0.666… and 66⅔%','0.6 and 6%','0.66 exactly and 66% exactly','0.23 and 23%'],0,'The sixes repeat forever; 66⅔% is exact.'),
        q('Complete the family: 1/9 = ? = ?',['0.111… and 11⅑%','0.19 and 19%','0.09 and 9%','0.9 and 90%'],0,'The ones repeat forever; 11⅑% is exact.'),
        q('Which fraction must be produced when the prompt shows 12.5%?',['1/8','1/5','1/4','1/10'],0,'12.5 percent is one eighth.'),
        q('Which decimal must be produced when the prompt shows 20%?',['0.2','0.02','2.0','0.5'],0,'Twenty percent means twenty hundredths, or 0.2.'),
        q('Which percent must be produced when the prompt shows 0.25?',['25%','2.5%','40%','0.25%'],0,'Move from decimal to percent by multiplying by 100.'),
        q('Which fraction must be produced when the prompt shows 0.5?',['1/2','1/5','1/4','1/10'],0,'Five tenths simplifies to one half.'),
        q('SELECT TWO: Which facts belong to the same family as 1/3?',['0.333…','33⅓%','0.3','3⅓%'],[0,1],'One third has repeating threes and equals thirty-three and one-third percent.'),
        q('SELECT TWO: Which facts belong to the same family as 1/8?',['0.125','12.5%','0.8','80%'],[0,1],'One eighth equals 0.125 and 12.5 percent.'),
        q('A student knows 1/4 = 25%. Which fact can be found by halving both values?',['1/8 = 12.5%','1/2 = 50%','1/5 = 20%','1/10 = 10%'],0,'Half of one fourth is one eighth; half of twenty-five percent is 12.5 percent.'),
        q('Why is selecting 0.125 from choices not enough to prove 1/8 is memorized?',['Recognition can use choices; memorization requires producing the forms with no clues','Multiple choice is always harder','Decimals cannot be memorized','Fractions do not have percent forms'],0,'Automatic recall must work before answer choices appear.')
      ],
      'NO-PEEK PRODUCTION: On blank paper, write all eight fractions in a shuffled order. Add each decimal and percent without notes or choices. Check only after all 24 entries are complete. Circle every miss, restudy that family, and reproduce the entire table correctly. CONNECTION: Use 1/8, 1/4, and 1/2 to describe three portions of one Science population.',
      'Connect the fact families to comparison, percent problems, coordinate values, and Science proportions so recall supports application.',
      'Mastery means 24/24 forms produced with no notes or choices on two checks separated by at least one day.'),

    lesson('math_v23_big8_mastery','DO SECOND • BIG 8 NO-PEEK READINESS • 24 Mixed Questions',source,
      'Complete this only after the cover–recall–check lesson and a full handwritten table from memory. Directions change on purpose: fraction to decimal, decimal to percent, percent to fraction, exact versus rounded, and repeating-pattern transfer. First-attempt recognition score must be at least 22/24, but final memorization evidence is a separate 24/24 no-peek production table today and again after at least one day.', '',[],[
        q('1/2 as a decimal is',['0.5','0.2','0.05','2.0'],0,'One half is 0.5.'),q('1/2 as a percent is',['50%','20%','5%','200%'],0,'One half is 50 percent.'),
        q('0.25 as a fraction is',['1/4','1/5','1/8','1/2'],0,'0.25 is one fourth.'),q('25% as a decimal is',['0.25','2.5','0.025','0.4'],0,'Twenty-five percent is 0.25.'),
        q('1/5 as a decimal is',['0.2','0.5','0.15','0.05'],0,'One fifth is 0.2.'),q('20% as a fraction is',['1/5','1/2','1/4','1/10'],0,'Twenty percent simplifies to one fifth.'),
        q('1/10 as a percent is',['10%','1%','100%','0.1%'],0,'One tenth is 10 percent.'),q('0.1 as a fraction is',['1/10','1/100','1/5','1/2'],0,'One tenth is 1/10.'),
        q('1/8 as a decimal is',['0.125','0.18','0.8','0.0125'],0,'One eighth is 0.125.'),q('12.5% as a fraction is',['1/8','1/5','1/4','1/10'],0,'12.5 percent is one eighth.'),
        q('1/3 as an exact decimal is',['0.333…','0.33 exactly','0.3','0.13'],0,'The threes repeat forever.'),q('33⅓% as a fraction is',['1/3','1/9','2/3','1/4'],0,'Thirty-three and one-third percent is one third.'),
        q('2/3 as an exact decimal is',['0.666…','0.66 exactly','0.6','0.23'],0,'The sixes repeat forever.'),q('66⅔% as a fraction is',['2/3','1/3','2/9','3/2'],0,'Sixty-six and two-thirds percent is two thirds.'),
        q('1/9 as an exact decimal is',['0.111…','0.19','0.09','0.9'],0,'The ones repeat forever.'),q('11⅑% as a fraction is',['1/9','1/11','1/10','9/10'],0,'Eleven and one-ninth percent is one ninth.'),
        q('Which complete family is correct?',['1/8 = 0.125 = 12.5%','1/8 = 0.8 = 80%','1/8 = 0.18 = 18%','1/8 = 1.25 = 125%'],0,'All three forms must represent the same value.'),
        q('Which complete family is correct?',['2/3 = 0.666… = 66⅔%','2/3 = 0.23 = 23%','2/3 = 0.66 exactly = 66% exactly','2/3 = 0.6 = 6%'],0,'The repeating forms are exact.'),
        q('What repeats in 37/99?',['the block 37','only the 3','only the 7','the block 99'],0,'For denominator 99, the two-digit numerator block repeats.'),
        q('What is 125/999 as a decimal?',['0.125125125…','0.125 exactly','0.999125…','0.0125'],0,'The three-digit numerator block repeats.'),
        q('Which is exact for 2/3?',['0.666…','0.667','0.66','66%'],0,'Only the repeating decimal shown is exact.'),
        q('A student writes 1/3 = 0.33 exactly. What is the repair?',['Write 0.333… or a bar over the 3','Write 0.3 exactly','Change the fraction to 3/1','Round it to 0'],0,'One third is repeating, not terminating.'),
        q('SELECT TWO: Which pairs are equivalent?',['1/4 and 25%','1/5 and 0.2','1/8 and 80%','1/10 and 1%'],[0,1],'One fourth is 25 percent; one fifth is 0.2.'),
        q('What evidence proves automatic recall rather than recognition?',['Producing all 24 forms on blank paper with no notes or choices','Choosing answers after viewing the table','Copying each row twice','Reading the list aloud while it remains visible'],0,'No-peek production demonstrates recall.')
      ],
      'FINAL NO-PEEK GATE: Produce the complete eight-row fraction–decimal–percent table on blank paper without prompts. Check after finishing. Repeat after at least one day. Submit or save a written explanation of the memory anchors and repair any missed family. CONNECTION: Explain how instant recall makes a mixed-number comparison more efficient.',
      'Connect automatic recall to current rational-number comparison and percent reasoning; memorized facts are tools, not substitutes for understanding.',
      'Ready for floating pop quizzes only after 24/24 no-peek production twice on different days, plus at least 22/24 on this shuffled check.',{test:true,mix:true})
  ];

  D.MATH.lessons.unshift(...lessons);
  globalThis.HIGHLIGHT_MEMORIZATION_V23={version:'2026-10-17-highlight-memorization-v23',counts:{MATH:lessons.length}};
})();
