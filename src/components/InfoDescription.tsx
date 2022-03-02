interface Props {
  title: string;
  description: string;
  children: JSX.Element;
}

function InfoDescription({ title, description, children }: Props) {
  return (
    <div className="infoDescriptionContainer">
      <div className="infoDescriptionTitle">{title}</div>
      <div className="infoDescriptionDes">{description}</div>
      <div>{children}</div>
    </div>
  );
}

export default InfoDescription;
