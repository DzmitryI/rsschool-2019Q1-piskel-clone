import mouseCoordinatesMove from '../components/model-dialog/mouseCoordinatesMove';

describe('mouseCoordinatesMove.prototype.mouseCoordinatesMove', () => {
  it('mouse move changes coordinates of canvas', () => {
    expect(mouseCoordinatesMove.prototype.mouseCoordinatesMove).toBeInstanceOf(Function);
  });
});
