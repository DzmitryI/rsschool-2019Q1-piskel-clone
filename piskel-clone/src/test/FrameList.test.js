import FrameList from '../components/frame-list/FrameList';

describe('FrameList.prototype.render', () => {
  it('Should be an instance of function', () => {
    expect(FrameList.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    // '<canvas class="canvas-conteiner__canvas">' +
    //   '  <span id="username" />' +
    //   '  <button id="button" />' +
    //   '</canvas>';
    // FrameList.prototype.render();

    // expect(document.body.innerHTML).toMatchSnapshot();
  });
});
