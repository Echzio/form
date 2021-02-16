import './style.scss';

const Background = () => (
  <div className="background-wrapper">
    <img
      src="/assets/images/mountain.jpg"
      alt="form background"
      className="background-wrapper__image"
    />
    <div className="background-wrapper__backdrop" />
  </div>
);

export { Background };
