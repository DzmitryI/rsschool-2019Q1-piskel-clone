import FrameList from '../components/frame-list/FrameList';

describe('FrameList.prototype.render', () => {
  it('Sould be an instance of function', () => {
    expect(FrameList.prototype.render).toBeInstanceOf(Function);
  });
});
