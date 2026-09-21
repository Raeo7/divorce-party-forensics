export const fmt = (n: number): string => {
  const abs = Math.abs(n).toLocaleString("en-US");
  return n < 0 ? `(${abs})` : abs;
};

export const signed = (n: number): string =>
  n === 0 ? "0" : `${n > 0 ? "+" : "-"}${Math.abs(n).toLocaleString("en-US")}`;

export function Money({ value }: { value: number }) {
  return <span className={value < 0 ? "neg" : undefined}>{fmt(value)}</span>;
}
