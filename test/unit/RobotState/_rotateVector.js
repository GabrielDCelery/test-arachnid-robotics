const { expect } = require('chai');
const RobotState = require('../../../src/entities/RobotState');

module.exports = () => {
  describe('static _rotateVector({ x, y, degrees })', () => {
    beforeEach(async () => {});
    afterEach(async () => {});

    it('rotates a vector to the left by 90 degrees', async () => {
      // Given
      const args1 = { x: 0, y: 1, degrees: 90 };
      const args2 = { x: 1, y: 0, degrees: 90 };
      const args3 = { x: 0, y: -1, degrees: 90 };
      const args4 = { x: -1, y: 0, degrees: 90 };

      // When
      const result1 = RobotState._rotateVector(args1);
      const result2 = RobotState._rotateVector(args2);
      const result3 = RobotState._rotateVector(args3);
      const result4 = RobotState._rotateVector(args4);

      //Then
      expect(result1).to.deep.equal({ x: -1, y: 0 });
      expect(result2).to.deep.equal({ x: 0, y: 1 });
      expect(result3).to.deep.equal({ x: 1, y: 0 });
      expect(result4).to.deep.equal({ x: 0, y: -1 });
    });

    it('rotates a vector to the right by 90 degrees', async () => {
      // Given
      const args1 = { x: 0, y: 1, degrees: -90 };
      const args2 = { x: 1, y: 0, degrees: -90 };
      const args3 = { x: 0, y: -1, degrees: -90 };
      const args4 = { x: -1, y: 0, degrees: -90 };

      // When
      const result1 = RobotState._rotateVector(args1);
      const result2 = RobotState._rotateVector(args2);
      const result3 = RobotState._rotateVector(args3);
      const result4 = RobotState._rotateVector(args4);

      //Then
      expect(result1).to.deep.equal({ x: 1, y: 0 });
      expect(result2).to.deep.equal({ x: 0, y: -1 });
      expect(result3).to.deep.equal({ x: -1, y: 0 });
      expect(result4).to.deep.equal({ x: 0, y: 1 });
    });

    it('rotates a vector by 180 degrees', async () => {
      // Given
      const args1 = { x: 0, y: 1, degrees: 180 };
      const args2 = { x: 1, y: 0, degrees: 180 };
      const args3 = { x: 0, y: -1, degrees: 180 };
      const args4 = { x: -1, y: 0, degrees: 180 };
      const args5 = { x: 0, y: 1, degrees: -180 };

      // When
      const result1 = RobotState._rotateVector(args1);
      const result2 = RobotState._rotateVector(args2);
      const result3 = RobotState._rotateVector(args3);
      const result4 = RobotState._rotateVector(args4);
      const result5 = RobotState._rotateVector(args5);

      //Then
      expect(result1).to.deep.equal({ x: 0, y: -1 });
      expect(result2).to.deep.equal({ x: -1, y: 0 });
      expect(result3).to.deep.equal({ x: 0, y: 1 });
      expect(result4).to.deep.equal({ x: 1, y: 0 });
      expect(result5).to.deep.equal({ x: 0, y: -1 });
      expect(result1).to.deep.equal(result5);
    });

    it('does not rorate vector', async () => {
      // Given
      const args1 = { x: 0, y: 1, degrees: 0 };
      const args2 = { x: 1, y: 0, degrees: 0 };
      const args3 = { x: 0, y: -1, degrees: 0 };
      const args4 = { x: -1, y: 0, degrees: 0 };

      // When
      const result1 = RobotState._rotateVector(args1);
      const result2 = RobotState._rotateVector(args2);
      const result3 = RobotState._rotateVector(args3);
      const result4 = RobotState._rotateVector(args4);

      //Then
      expect(result1).to.deep.equal({ x: 0, y: 1 });
      expect(result2).to.deep.equal({ x: 1, y: 0 });
      expect(result3).to.deep.equal({ x: 0, y: -1 });
      expect(result4).to.deep.equal({ x: -1, y: 0 });
    });
  });
};
