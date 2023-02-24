const {
    filterByAge,
    filterByScore,
    filterByServiceRecord,
    sortByScore,
    getMeanAge,
    getMeanAgeReduce,
    getNamesOnly,
  } = require('../index');
  
  describe('Система отбора кандидатов в космонавты', () => {
    let candidates;
    beforeEach(() => {
      candidates = [
        {
          name: 'Василий Петров',
          age: 60,
          score: 98,
          serviceRecord: 36,
        },
        {
          name: 'Екатерина Фёдорова',
          age: 35,
          score: 90,
          serviceRecord: 7,
        },
        {
          name: 'Иван Иванов',
          age: 29,
          score: 67,
          serviceRecord: 2,
        },
        {
          name: 'Зинаида Абрамова',
          age: 45,
          score: 78,
          serviceRecord: 14,
        },
        {
          name: 'Виктор Олегов',
          age: 54,
          score: 85,
          serviceRecord: 21,
        },
      ];
    });
    it('позволяет отсеять кандидатов старше 50 лет', () => {
      const cosmonauts = candidates.filter(filterByAge);
      expect(cosmonauts).toEqual([candidates[1], candidates[2], candidates[3]]);
      expect(candidates).not.toBe(cosmonauts);
    });
    it('позволяет отсеять кандидатов с оценкой ниже 75', () => {
      const cosmonauts = candidates.filter(filterByScore);
      expect(cosmonauts).toEqual([candidates[0], candidates[1], candidates[3], candidates[4]]);
      expect(candidates).not.toBe(cosmonauts);
    });
    it('позволяет отсеять кандидатов с выслугой лет меньше 5', () => {
      const cosmonauts = candidates.filter(filterByServiceRecord);
      expect(cosmonauts).toEqual([candidates[0], candidates[1], candidates[3], candidates[4]]);
      expect(candidates).not.toBe(cosmonauts);
    });
    it('позволяет корректно применить все фильтры сразу', () => {
      const cosmonauts = candidates
        .filter(filterByAge)
        .filter(filterByScore)
        .filter(filterByServiceRecord);
      expect(cosmonauts).toEqual([candidates[1], candidates[3]]);
      expect(candidates).not.toBe(cosmonauts);
    });
    it('позволяет отсортировать кандидатов по оценке', () => {
      const sortedCandidates = sortByScore(candidates);
      expect(sortedCandidates).toEqual([
        candidates[0], candidates[1], candidates[4], candidates[3], candidates[2],
      ]);
      expect(sortedCandidates).not.toBe(candidates);
    });
    it('позволяет получить средний возраст кандидатов', () => {
      const mean = getMeanAge(candidates);
      expect(mean).toBe(44.6);
    });
    it('позволяет получить средний возраст кандидатов с помощью reduce', () => {
      const mean = getMeanAgeReduce(candidates);
      expect(mean).toBe(44.6);
      expect(getMeanAgeReduce.toString()).toContain('reduce');
    });
    it('позволяет получить список только имён кандидатов', () => {
      const names = candidates.map(getNamesOnly);
      expect(names).toEqual([
        'Василий Петров', 'Екатерина Фёдорова', 'Иван Иванов',
        'Зинаида Абрамова', 'Виктор Олегов',
      ]);
    });
  });
  