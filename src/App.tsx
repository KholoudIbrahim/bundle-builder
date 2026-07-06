import { BundleProvider } from "./context/BundleContext";
import { PageShell } from "./components/layout/PageShell";

export function App() {
  return (
    <BundleProvider>
      <PageShell />
    </BundleProvider>
  );
}
