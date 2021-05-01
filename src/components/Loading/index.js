import './Loading.scss';
export default function Loading(props) {
  const { label } = props;
  return (
    <div className="loading">
      <div className="loader-16"></div>
      <p>{label}</p>
    </div>
  );
}
