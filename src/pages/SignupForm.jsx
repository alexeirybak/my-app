import { useForm } from "react-hook-form";
import "./SignupForm.css";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      example: "",
      exampleRequired: "",
    },
  });

  console.log(watch("example"));

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
    >
      <label>Example</label>
      <input {...register("example")} defaultValue="test" />
      <label>ExampleRequired</label>
      <input
        {...register("exampleRequired", { required: true, maxLength: 10 })}
      />
      {errors.exampleRequired && <p>Это поле обязательно</p>}
      <input type="submit" />
    </form>
  );
}
