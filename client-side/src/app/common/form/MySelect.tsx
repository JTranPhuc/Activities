import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  options: any;
}

const MySelect = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select clearable value={field.value || null} options={props.options} onChange={(e, d) => helpers.setValue(d.value)} onBlur={() => helpers.setTouched(true)} placeholder={props.placeholder}></Select>

      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default MySelect;
