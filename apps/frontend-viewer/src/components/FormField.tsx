import { type UseFormRegister } from "react-hook-form";

interface IFormFieldProp {
  text: string;
  name: string;
  type: "text" | "password";
  register: UseFormRegister<any>;
  options?: any;
}

const FormField = ({ text, name, type, register, options }: IFormFieldProp) => {
  return (
    <div>
      <label className="text-[var(--color-muted)] block mb-2 text-xl">
        {text}:
      </label>
      <input
        className="bg-[var(--color-carbon)] rounded-l border-2 block w-full border-[var(--color-border)] h-8 text-[var(--color-surface)]"
        type={type}
        {...register(name, options)}
      />
    </div>
  );
};

export default FormField;
