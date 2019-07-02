import './landing.scss';

import eraserCursorImg from '../../../assets/images/linding prew/prewiev.png';
import functionalityLiveIcon from '../../../assets/images/icons/functionality/live.png';
import functionalexportIcon from '../../../assets/images/icons/functionality/export.png';
import functionalityFpsIcon from '../../../assets/images/icons/functionality/fps.png';

import functionalityAutorMailIcon from '../../../assets/images/icons/autor/mail.svg';
import functionalityAutorGitIcon from '../../../assets/images/icons/autor/git.svg';
import functionalityAutorCVIcon from '../../../assets/images/icons/autor/cv.svg';


export default class Landing {
  constructor() {
    this.form = document;
  }

  init() {
    const buttonClose = this.form.querySelector('.landing-button');
    buttonClose.addEventListener('click', this.buttonCloseClick.bind(this));

    const landinPagePrewiev = this.form.getElementById('landing-page__screenshot_img');
    landinPagePrewiev.src = eraserCursorImg;
    const functionalityLive = this.form.getElementById('landing-page__functionality_live_img');
    functionalityLive.src = functionalityLiveIcon;
    const functionalityExport = this.form.getElementById('landing-page__functionality_export_img');
    functionalityExport.src = functionalexportIcon;
    const functionalityFps = this.form.getElementById('landing-page__functionality_fps_img');
    functionalityFps.src = functionalityFpsIcon;

    const functionalityAutorMail = this.form.getElementById('landing-page__autor_mail_img');
    functionalityAutorMail.src = functionalityAutorMailIcon;
    const functionalityAutorGit = this.form.getElementById('landing-page__autor_git_img');
    functionalityAutorGit.src = functionalityAutorGitIcon;
    const functionalityAutorCV = this.form.getElementById('landing-page__autor_cv_img');
    functionalityAutorCV.src = functionalityAutorCVIcon;
  }

  buttonCloseClick() {
    const landing = this.form.querySelector('#landing-page-conteiner');
    landing.classList.toggle('closed');
  }
}
