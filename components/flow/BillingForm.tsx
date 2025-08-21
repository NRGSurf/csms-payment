import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Divider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import type { InvoiceForm } from "./types";

export default function BillingForm({
  initial,
  onSubmit,
  busy,
}: {
  initial?: Partial<InvoiceForm>;
  onSubmit: (values: InvoiceForm, wantsFullInvoice: boolean) => void;
  busy?: boolean;
}) {
  const [wantsFullInvoice, setWantsFullInvoice] = useState(false);

  const schema = useMemo(
    () =>
      (wantsFullInvoice
        ? z.object({
            fullName: z.string().min(1),
            email: z.string().email(),
            phone: z.string().optional(),
            street: z.string().min(1),
            postalCode: z.string().min(1),
            city: z.string().min(1),
            country: z.string().min(1),
          })
        : z.object({
            fullName: z.string().min(1),
            email: z.string().email(),
            phone: z.string().optional(),
            street: z.string().optional(),
            postalCode: z.string().optional(),
            city: z.string().optional(),
            country: z.string().optional(),
          })) satisfies z.ZodType<InvoiceForm>,
    [wantsFullInvoice]
  );

  const { register, handleSubmit, formState, watch } = useForm<InvoiceForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: initial?.fullName ?? "",
      email: initial?.email ?? "",
      phone: initial?.phone ?? "",
      street: initial?.street ?? "",
      postalCode: initial?.postalCode ?? "",
      city: initial?.city ?? "",
      country: initial?.country ?? "AT",
    },
    mode: "onChange",
  });

  const submit = handleSubmit((values) => onSubmit(values, wantsFullInvoice));

  const errors = formState.errors;
  const values = watch();

  return (
    <Box className="flex flex-col gap-3">
      <Typography variant="h6">Billing details</Typography>
      <Typography variant="body2" className="opacity-80">
        For amounts ≤ €400 in AT, address isn’t required. Enable full invoice if
        you need a business invoice or higher amounts.
      </Typography>

      <Box className="flex items-center gap-2 mt-1">
        <Switch
          checked={wantsFullInvoice}
          onChange={(e) => setWantsFullInvoice(e.target.checked)}
          inputProps={{ "aria-label": "Full invoice" }}
        />
        <Typography>Need full invoice (add address)</Typography>
      </Box>

      <TextField
        label="Full name"
        {...register("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        required
      />
      <TextField
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        required
      />
      <TextField label="Phone (optional)" {...register("phone")} />

      {wantsFullInvoice && (
        <>
          <Divider className="my-2" />
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField
              label="Street"
              {...register("street")}
              error={!!errors.street}
              helperText={errors.street?.message}
              required
            />
            <TextField
              label="Postal code"
              {...register("postalCode")}
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
              required
            />
          </Box>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextField
              label="City"
              {...register("city")}
              error={!!errors.city}
              helperText={errors.city?.message}
              required
            />
            <TextField
              label="Country"
              {...register("country")}
              error={!!errors.country}
              helperText={errors.country?.message}
              required
            />
          </Box>
        </>
      )}

      <Box className="flex justify-end">
        <Button
          variant="contained"
          onClick={submit}
          disabled={busy || !formState.isValid}
        >
          {busy ? "Please wait…" : "Continue to payment"}
        </Button>
      </Box>
    </Box>
  );
}
