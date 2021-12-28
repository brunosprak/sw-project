import { timelineToEra, templateTopToCanonicityAndEra } from './utils';
describe('utils.js', () => {
  it('should generate timeline: timelineToEra', () => {
    expect(timelineToEra('', 'canon', '33 ABY')).toBe('can/rotfo');
    expect(timelineToEra('', 'canon', '433 ABY')).toBe('can/rotfo');
    expect(timelineToEra('', 'canon', 'c. 30 ABY')).toBe('can/rotfo');
    expect(timelineToEra('', 'canon', 'c. 49-50 ABY')).toBe('can/rotfo');
    expect(timelineToEra('', 'canon', '33 ABY - 40 ABY')).toBe('can/rotfo');
    expect(timelineToEra('', 'canon', '200 BBY')).toBe('can/thr');
    expect(timelineToEra('', 'canon', '18 BBY')).toBe('can/rote');
    expect(timelineToEra('', 'canon', '42 BBY')).toBe('can/fotj');

    expect(timelineToEra(`{{Top|new|real|title=''{{PAGENAME}}''}}`, 'legends', '42 BBY')).toBe(
      'leg/new'
    );
  });
  it('should generate era and timeline: templateTopToCanonicityAndEra', () => {
    expect(
      templateTopToCanonicityAndEra(`{{Top|new|real|title=''{{PAGENAME}}''}}`, '33 ABY')
    ).toStrictEqual(['legends', 'leg/new']);
    expect(
      templateTopToCanonicityAndEra(`{{Top|can|title=''{{PAGENAME}}''}}`, '33 ABY')
    ).toStrictEqual(['canon', 'can/rotfo']);
  });
});
