interface Props {
  title: string;
  value: string;
}

function InfoBolder({ title, value }: Props) {
  return (
    <div className="infoBolderContainer">
      <div className="infoBolderTitle">{title}</div>
      <div className="infoBolderValue">{value}</div>
    </div>
  );
}

export default InfoBolder;
