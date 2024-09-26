# Doom UI

Doom UI is a powerful and flexible UI library for building modern web applications. This library provides a set of reusable components that can be easily integrated into your projects.

## Installation

To install Doom UI, use npm:

```bash
npm install doom-ui
```

## Components examples

### Button

```tsx
<Button
type="submit"
buttonProps={{
    disabled: isSubmitDisabled,
}}
>
Save
</Button>
```

### DatePicker

```tsx
<DatePicker
    id="start-date"
    label="Start Date"
    inputProps={{
        ...register("startDate", {
        required: { value: true, message: "Start Date is required" },
        }),
    }}
    error={formState.errors["startDate"]?.message}
/>
```

### Dialog

```tsx
const ConfirmationDialog: FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} closeOnOverlayClick>
      <span>Employee created successfully!</span>
    </Dialog>
  );
};
```

### Input

```tsx
<Input
    id="last-name"
    label="Last Name"
    type="text"
    inputProps={{
        ...register("lastName", {
        required: { value: true, message: "Last Name is required" },
        maxLength: {
            value: 20,
            message: "Last Name should not exceed 20 characters",
        },
        }),
    }}
    error={formState.errors["lastName"]?.message}
/>
```

### Select

```tsx
<Select
    id="showEntries"
    onChange={pagination?.onShowEntries}
    options={[
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "50", label: "50" },
        { value: "100", label: "100" },
    ]}
/>
```

### Table

```tsx
<Table
    columns={columns}
    rows={rows}
    enablePagination
    enableSearch
    isLoading={isFetchingEmployees}
    title="Current Employees"
/>
```

## Contact

For any questions or feedback, please open an issue on our [GitHub repository](https://github.com/Zansuken/doom-ui).
