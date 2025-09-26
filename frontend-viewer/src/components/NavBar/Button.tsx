interface IButtonProp {
  text: string;
}

const Button = ({ text }: IButtonProp) => {
  return <button className="text-xl font-['Roboto'] ">{text}</button>;
};

export default Button;
