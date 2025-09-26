interface IButtonProp {
  text: string;
}

const Button = ({ text }: IButtonProp) => {
  return <button className="text-xl">{text}</button>;
};

export default Button;
