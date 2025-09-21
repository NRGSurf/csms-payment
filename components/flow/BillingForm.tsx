import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { InvoiceForm } from "./types";
import {
  Shield,
  Inbox,
  User,
  Home,
  Hash,
  Landmark,
  CheckCircle,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Props = {
  initial?: InvoiceForm;
  onSubmit: (values: InvoiceForm, wantsFullInvoice: boolean) => void;
  busy?: boolean;
};

export default function BillingForm({
  initial,
  onSubmit,
  busy = false,
}: Props) {
  const { t } = useI18n();
  const [wantsFullInvoice, setWantsFullInvoice] = useState<boolean>(
    Boolean(
      initial?.street ||
        initial?.postalCode ||
        initial?.city ||
        initial?.country
    )
  );

  const baseSchema = useMemo(
    () =>
      z.object({
        fullName: z.string().optional(),
        email: z.string().email(t("billing.emailError")),
        phone: z.string().optional(),
        street: z.string().optional(),
        postalCode: z.string().optional(),
        city: z.string().optional(),
        country: z.string().optional(),
        vatId: z.string().optional(),
        acceptTerms: z.boolean().default(false),
        waiveWithdrawal: z.boolean().default(false),
        emailConsent: z.boolean().default(false),
      }),
    [t]
  );

  const schema = useMemo(() => {
    const withAddressRules = baseSchema.extend({
      fullName: z.string().min(2, t("billing.fullNameError")),
      street: z.string().min(3, t("billing.streetError")),
      postalCode: z.string().min(2, t("billing.postalCodeError")),
      city: z.string().min(2, t("billing.cityError")),
      country: z.string().min(2, t("billing.countryError")),
    });

    const applyLegal = (schema: typeof baseSchema | typeof withAddressRules) =>
      schema.superRefine((v, ctx) => {
        if (v.acceptTerms !== true) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["acceptTerms"],
            message: t("legal.termsError"), // „Bitte AGB akzeptieren.“
          });
        }
        if (v.waiveWithdrawal !== true) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["waiveWithdrawal"],
            message: t("legal.waiveError"), // „Bitte Widerrufsverzicht bestätigen.“
          });
        }
      });

    return wantsFullInvoice
      ? applyLegal(withAddressRules)
      : applyLegal(baseSchema);
  }, [wantsFullInvoice, baseSchema, t]);

  type FormIn = z.input<typeof baseSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, submitCount },
    clearErrors,
    trigger,
    unregister,
  } = useForm<FormIn, any, InvoiceForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: initial?.fullName ?? "",
      email: initial?.email ?? "",
      phone: initial?.phone ?? "",
      street: initial?.street ?? "",
      postalCode: initial?.postalCode ?? "",
      city: initial?.city ?? "",
      country: initial?.country ?? "",
      vatId: initial?.vatId ?? "",
      acceptTerms: initial?.acceptTerms ?? false,
      waiveWithdrawal: initial?.waiveWithdrawal ?? false,
      emailConsent: initial?.emailConsent ?? false,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: true,
  });

  const showErr = (name: keyof FormIn) =>
    Boolean(errors[name]) && (touchedFields[name] || submitCount > 0);

  const inputClass = (name: keyof FormIn) =>
    `w-full rounded-lg border px-3 py-2 outline-none transition ${
      showErr(name)
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:ring-2 focus:ring-blue-200"
    }`;

  const submit = handleSubmit((values) => onSubmit(values, wantsFullInvoice));

  const addressKeys: (keyof FormIn)[] = [
    "fullName",
    "street",
    "postalCode",
    "city",
    "country",
    "phone",
    "vatId",
  ];

  const handleToggleInvoice = () => {
    setWantsFullInvoice((prev) => {
      const next = !prev;
      if (next) {
        // turning ON: don't validate immediately, just clear old errors
        clearErrors(addressKeys);
      } else {
        // turning OFF: unregister address fields and revalidate the rest
        unregister(addressKeys);
        setTimeout(() => trigger(), 0);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {t("billing.title")}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{t("billing.description")}</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl border-0 p-6 space-y-6">
        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
              <Inbox className="w-4 h-4" />
              {t("billing.email")}
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder={t("billing.emailPlaceholder")}
              className={`w-full rounded-lg border px-3 py-2 outline-none transition
              `}
            />
            {showErr("email") && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>
        </div>

        {/* Invoice toggle */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleToggleInvoice}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggleInvoice();
            }
          }}
          aria-pressed={wantsFullInvoice}
          className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 cursor-pointer select-none"
        >
          <div className="pr-3">
            <p className="text-sm font-medium text-gray-800">
              {t("billing.invoiceToggleTitle")}
            </p>
            <p className="text-xs text-gray-500">
              {t("billing.invoiceToggleDescription")}
            </p>
          </div>

          {/* Visual switch (no separate button needed) */}
          <div
            className={`relative ml-4 h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-200 ${
              wantsFullInvoice ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-hidden="true"
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                wantsFullInvoice ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </div>

        {/* Address fields */}
        {wantsFullInvoice && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <User className="w-4 h-4" />
                {t("billing.fullName")}
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder={t("billing.fullNamePlaceholder")}
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                `}
              />
              {showErr("fullName") && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.fullName?.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4" />
                {t("billing.phone")}
              </label>
              <input
                type="tel"
                {...register("phone")}
                placeholder={t("billing.phonePlaceholder")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Home className="w-4 h-4" />
                {t("billing.street")}
              </label>
              <input
                type="text"
                {...register("street")}
                placeholder={t("billing.streetPlaceholder")}
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                  `}
              />
              {showErr("street") && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.street?.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Hash className="w-4 h-4" />
                {t("billing.postalCode")}
              </label>
              <input
                type="text"
                {...register("postalCode")}
                placeholder={t("billing.postalCodePlaceholder")}
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                  `}
              />
              {showErr("postalCode") && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.postalCode?.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Landmark className="w-4 h-4" />
                {t("billing.city")}
              </label>
              <input
                type="text"
                {...register("city")}
                placeholder={t("billing.cityPlaceholder")}
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                 `}
              />
              {showErr("city") && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.city?.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                {t("billing.country")}
              </label>
              <input
                type="text"
                {...register("country")}
                placeholder={t("billing.countryPlaceholder")}
                className={`w-full rounded-lg border px-3 py-2 outline-none transition
                  `}
              />
              {showErr("country") && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.country?.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4" />
                {t("billing.vatId")}
              </label>
              <input
                type="text"
                {...register("vatId")}
                placeholder={t("billing.vatIdPlaceholder")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        )}

        {/* Legal confirmations */}
        <div className="space-y-3">
          {/* AGB – Pflicht */}
          <div className="flex items-start gap-3">
            <input
              id="acceptTerms"
              type="checkbox"
              {...register("acceptTerms")}
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-800">
              <span className="font-medium">{t("legal.termsLabel")}</span>
              <br />
              <span className="text-gray-600">
                {t("legal.termsText")}{" "}
                <a
                  href="/agb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {t("legal.termsLink")}
                </a>
                .
              </span>
            </label>
          </div>

          {/* Widerrufsverzicht – Pflicht */}
          <div className="flex items-start gap-3">
            <input
              id="waiveWithdrawal"
              type="checkbox"
              {...register("waiveWithdrawal")}
            />
            <label htmlFor="waiveWithdrawal" className="text-sm text-gray-800">
              <span className="font-medium">{t("legal.waiveLabel")}</span>
              <br />
              <span className="text-gray-600">
                {t("legal.waiveTextBefore")}{" "}
                <strong>{t("legal.waiveTextStrong")}</strong>{" "}
                {t("legal.waiveTextAfter")}{" "}
                <a
                  href="/agb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {t("legal.rightOfWithdrawalLink")}
                </a>
                .
              </span>
            </label>
          </div>

          {/* Email consent – Optional */}
          <div className="flex items-start gap-3">
            <input
              id="emailConsent"
              type="checkbox"
              {...register("emailConsent")}
            />
            <label htmlFor="emailConsent" className="text-sm text-gray-800">
              <span className="font-medium">
                {t("legal.emailConsentLabel")}
              </span>
              <br />
              <span className="text-gray-600">
                {t("legal.emailConsentText")}
              </span>
            </label>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={submit}
            disabled={busy || !isValid}
            className={`rounded-xl px-5 h-12 min-w-[220px] text-white font-medium transition
              ${
                busy || !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-900/90"
              }`}
          >
            {busy ? t("billing.submitWaiting") : t("billing.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
