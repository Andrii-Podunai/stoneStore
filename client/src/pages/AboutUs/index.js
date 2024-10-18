import { Fragment } from 'react';
import './style.scss';

function AboutUs() {
  return (
    <Fragment>
      <div className="about-main">
        <h1 className="about-main--title">Про нас</h1>
        <p className="about-main--text">
          Ми технологічний стартап, який допомагає людям продавати та купувати вторсировину простим
          і зручним шляхом.
        </p>
      </div>
      <div className="about-mission_wrp">
        <p className="about-mission_wrp--text">
          Stone - це великий майданчик для купівлі та продажу вторсировини. На цьому майданчику
          можна знайти широкий вибір вживаних товарів, таких як електроніка, меблі, одяг та багато
          іншого. Користувачі можуть продавати свої вторсировинні товари, використовуючи механізм
          продажу на Stone, або пошукати та купувати вторсировинні товари за вигідними цінами.
          Майданчик Stone пропонує зручний та безпечний спосіб для купівлі та продажу вторсировини.
        </p>
      </div>
      <div className="about-mission">
        <div className="about-mission_wrp">
          <h1 className="about-mission_wrp--title">Наша місія</h1>
          <p className="about-mission_wrp--text">
            Забезпечити світ інноваційними технологіями, що допоможуть людству створити стійку
            кругову економіку шляхом повторного використання.
          </p>
        </div>
      </div>
      <div className="about-warning">
        <p className="about-warning--text">
          *Логотип і торговий знак «Stone» є інтелектуальною власністю компанії та охороняється
          законом України № 3689-12 «Про охорону прав на знаки для товарів і послуг». Будь-яке
          використання, копіювання і плагіат назви і логотипу вважається порушенням прав власника,
          що тягне за собою кримінальну відповідальність згідно з чинним законодавством України.
        </p>
      </div>
    </Fragment>
  );
}
export default AboutUs;
