import { type UseFormRegister } from "react-hook-form";

interface IFormFieldProp {
  text: string;
  name: string;
  type: "text" | "password" | "textarea";
  register: UseFormRegister<any>;
  options?: any;
}

const FormField = ({ text, name, type, register, options }: IFormFieldProp) => {
  return (
    <div>
      <label className="text-[var(--color-muted)] block mb-2 text-xl">
        {text}:
      </label>

      {type === "textarea" ? (
        <textarea
          {...register(name, options)}
          className="bg-[var(--color-carbon)] rounded-md border-2 block w-full border-[var(--color-border)] text-[var(--color-surface)] p-2 min-h-[200px] resize-y"
        />
      ) : (
        <input
          type={type}
          {...register(name, options)}
          className="bg-[var(--color-carbon)] rounded-md border-2 block w-full border-[var(--color-border)] h-8 text-[var(--color-surface)] p-2"
        />
      )}
    </div>
  );
};

export default FormField;
