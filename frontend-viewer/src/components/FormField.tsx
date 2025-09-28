interface IFormFieldProp {
  text: string;
  name: string;
  type: "text" | "password";
}
const FormField = ({ text, name, type }: IFormFieldProp) => {
  return (
    <div>
      <label className="text-[var(--color-muted)] block mb-1">{text}:</label>
      <input
        className=" bg-[var(--color-carbon)] rounded-l border-2 block w-full border-[var(--color-border)]"
        type={type}
        name={name}
      />
    </div>
  );
};

export default FormField;
